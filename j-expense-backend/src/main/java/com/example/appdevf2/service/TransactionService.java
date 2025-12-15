package com.example.appdevf2.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.appdevf2.entity.CategoryEntity;
import com.example.appdevf2.entity.ExpenseEntity;
import com.example.appdevf2.entity.IncomeEntity;
import com.example.appdevf2.entity.RecurringTransactionEntity;
import com.example.appdevf2.entity.TransactionDTO;
import com.example.appdevf2.entity.TransactionEntity;
import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.repository.CategoryRepository;
import com.example.appdevf2.repository.ExpenseRepository;
import com.example.appdevf2.repository.IncomeRepository;
import com.example.appdevf2.repository.RecurringTransactionRepository;
import com.example.appdevf2.repository.TransactionRepository;
import com.example.appdevf2.repository.UserRepository;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository trepo;

    @Autowired
    private UserRepository urepo;

    @Autowired
    private CategoryRepository crepo;

    @Autowired
    private ExpenseRepository erepo;

    @Autowired
    private IncomeRepository irepo;

    @Autowired
    private RecurringTransactionRepository rrepo;


    // C - Create or insert transaction record
    // public TransactionEntity insertTransaction(TransactionEntity transaction) {
    // return trepo.save(transaction);
    // }




    public TransactionEntity insertTransaction(TransactionDTO dto) {

        // 1. Fetch User
        UserEntity user = urepo.findById(dto.getUserID())
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + dto.getUserID()));

        TransactionEntity t = new TransactionEntity();
        t.setAmount(dto.getAmount());
        t.setCreation_date(dto.getCreation_date());
        t.setDescription(dto.getDescription());
        t.setName(dto.getName());
        t.setUser(user);

        // --- HANDLE INCOME / EXPENSE ---
        if (dto.getIsIncome() == null)
            throw new IllegalArgumentException("isIncome must be specified.");

        if (dto.getCategoryID() > 0) {
            CategoryEntity category = crepo.findById(dto.getCategoryID())
                    .orElseThrow(() ->
                            new NoSuchElementException("Category not found with ID: " + dto.getCategoryID())
                    );
            t.setCategory(category);
        }


        if (dto.getIsIncome()) {
           
            t.setIncomeFlag(true);

            IncomeEntity income = new IncomeEntity();
            income.setType(dto.getIncomeType());

            IncomeEntity savedIncome = irepo.save(income);
            t.setIncome(savedIncome);
            t.setExpense(null);

        } else {
           
            t.setIncomeFlag(false);

            ExpenseEntity expense = new ExpenseEntity();
            expense.setPayment_method(dto.getPaymentMethod());
            expense.setReccuring(dto.getIsRecurring());

            ExpenseEntity savedExpense = erepo.save(expense);
            t.setExpense(savedExpense);
            t.setIncome(null);
        }

        // --- SAVE TRANSACTION FIRST (WE NEED billID FOR RECURRING) ---
        TransactionEntity saved = trepo.save(t);

        // --- CREATE RECURRING ONLY IF: 
        //     • NOT income 
        //     • isRecurring == true
        //     • recurring fields exist
        if (!saved.getIncomeFlag() && Boolean.TRUE.equals(dto.getIsRecurring())) {

            if (dto.getRecurringDate() == null || dto.getIntervalDays() == null) {
                throw new IllegalArgumentException("Recurring expense must have recurringDate & intervalDays.");
            }

            RecurringTransactionEntity rec = new RecurringTransactionEntity();
            rec.setTransaction(saved); // link to parent
            rec.setUser(saved.getUser());
            rec.setAmount(saved.getAmount());
            rec.setDescription(saved.getDescription());
            rec.setRecurringDate(dto.getRecurringDate());
            rec.setIntervalDays(dto.getIntervalDays());

            rrepo.save(rec);

            if (saved.getRecurringTransactions() == null) saved.setRecurringTransactions(new ArrayList<>());
            saved.getRecurringTransactions().add(rec);
        }

        return saved;
    }
    

    // R - Read all transaction records
    public List<TransactionEntity> getAllTransactions() {
        return trepo.findAll();
    }

    // R - read transaction by id
    public TransactionEntity getTransactionById(int id) {
        return trepo.findById(id).orElse(null);
    }

    @Transactional(readOnly = true) // ensure lazy fields are loaded
    public TransactionDTO getTransactionDTOById(int id) {
        TransactionEntity entity = getTransactionById(id);
        if (entity == null) return null;
        
        TransactionDTO dto = new TransactionDTO();
        dto.setAmount(entity.getAmount());
        dto.setCreation_date(entity.getCreation_date());
        dto.setDescription(entity.getDescription());
        dto.setName(entity.getName());
        
        if (entity.getUser() != null) {
            dto.setUserID(entity.getUser().getUserID());
        }
        
        if (entity.getCategory() != null) {
            dto.setCategoryID(entity.getCategory().getCategoryID());
        }
        
        dto.setIsIncome(entity.getIncomeFlag());
        
        if (entity.getIncome() != null) {
            dto.setIncomeType(entity.getIncome().getType());
        }
        
        if (entity.getExpense() != null) {
            dto.setPaymentMethod(entity.getExpense().getPayment_method());
            dto.setIsRecurring(entity.getExpense().isReccuring());
        }
        
        // Add recurring transaction data if exists
        if (entity.getRecurringTransactions() != null && !entity.getRecurringTransactions().isEmpty()) {
            RecurringTransactionEntity rec = entity.getRecurringTransactions().get(0);
            dto.setIntervalDays(rec.getIntervalDays());
            dto.setRecurringDate(rec.getRecurringDate());
        }
        
        return dto;
    }


    
    public List<TransactionEntity> getTransactionsByUser(int userId) {
        // Fetch all transactions
        List<TransactionEntity> all = trepo.findAll();

        // Filter in memory by user ID
        return all.stream()
                .filter(t -> t.getUser() != null && t.getUser().getUserID() == userId)
                .collect(Collectors.toList());
    }


    
    // U - Update a transaction
    // @SuppressWarnings("finally")
    // public TransactionEntity updateTransaction(int tid, TransactionEntity newTransactionDetails) {
    //     TransactionEntity t = new TransactionEntity();
    //     try {
    //         // 1) Search the transaction by ID
    //         t = trepo.findById(tid).get();

    //         // 2) Update the record
    //         t.setAmount(newTransactionDetails.getAmount());
    //         t.setCreation_date(newTransactionDetails.getCreation_date());
    //         t.setDescription(newTransactionDetails.getDescription());

    //     } catch (NoSuchElementException e) {
    //         throw new NoSuchElementException("Transaction: " + tid + " is not found");
    //     } finally {
    //         return trepo.save(t);
    //     }
    // }


    // U - Update a transaction
    // Overloaded method that accepts TransactionEntity
    public TransactionEntity updateTransaction(int tid, TransactionEntity entity) {
        TransactionDTO dto = new TransactionDTO();
        dto.setAmount(entity.getAmount());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setUserID(entity.getUser() != null ? entity.getUser().getUserID() : 0);
        dto.setCategoryID(entity.getCategory() != null ? entity.getCategory().getCategoryID() : 0);
        dto.setIsIncome(entity.getIncomeFlag());
        
        if (entity.getIncome() != null) {
            dto.setIncomeType(entity.getIncome().getType());
        }
        if (entity.getExpense() != null) {
            dto.setPaymentMethod(entity.getExpense().getPayment_method());
           // dto.setIsRecurring(entity.getExpense().getReccuring());
        }
        // Add other fields mapping if needed

        return updateTransaction(tid, dto); // call main DTO method
    }

    // Main update logic using TransactionDTO
    public TransactionEntity updateTransaction(int tid, TransactionDTO dto) {
        TransactionEntity t = trepo.findById(tid)
            .orElseThrow(() -> new NoSuchElementException("Transaction not found with ID: " + tid));

        // Update basic fields
        t.setAmount(dto.getAmount());
        t.setCreation_date(dto.getCreation_date()); // ensure valid Date
        t.setDescription(dto.getDescription());
        t.setName(dto.getName());

        // Update category
        if (dto.getCategoryID() > 0) {
            crepo.findById(dto.getCategoryID())
                .ifPresentOrElse(
                    t::setCategory,
                    () -> { throw new NoSuchElementException("Category not found with ID: " + dto.getCategoryID()); }
                );
        }

        // Update transaction type
        if (dto.getIsIncome() != null) {
            t.setIncomeFlag(dto.getIsIncome());

            if (dto.getIsIncome()) {
                IncomeEntity income = t.getIncome();
                if (income == null) income = new IncomeEntity();
                income.setType(dto.getIncomeType());
                t.setIncome(irepo.save(income));
                t.setExpense(null);
            } else {
                ExpenseEntity expense = t.getExpense();
                if (expense == null) expense = new ExpenseEntity();
                expense.setPayment_method(dto.getPaymentMethod());
                expense.setReccuring(dto.getIsRecurring());
                t.setExpense(erepo.save(expense));
                t.setIncome(null);
            }
        }

        //recurring trsnaction part
        try {
            // Only consider recurrence for expense transactions (not income)
            if (Boolean.FALSE.equals(dto.getIsIncome())) {
                boolean wantsRecurring = Boolean.TRUE.equals(dto.getIsRecurring());

                // existing recurring list attached to t
                List<RecurringTransactionEntity> existing = t.getRecurringTransactions();

                if (wantsRecurring) {
                    // must have intervalDays and recurringDate validated by caller
                    RecurringTransactionEntity rec;
                    if (existing != null && !existing.isEmpty()) {
                        // update first recurring record
                        rec = existing.get(0);
                    } else {
                        // create new recurring entity and link it
                        rec = new RecurringTransactionEntity();
                        rec.setTransaction(t);
                    }

                    rec.setAmount(dto.getAmount());
                    rec.setDescription(dto.getDescription());
                    rec.setIntervalDays(dto.getIntervalDays() != null ? dto.getIntervalDays() : 1);
                    rec.setRecurringDate(dto.getRecurringDate());

                    RecurringTransactionEntity savedRec = rrepo.save(rec);

                    // ensure t.recurringTransactions contains the savedRec
                    if (t.getRecurringTransactions() == null) t.setRecurringTransactions(new java.util.ArrayList<>());
                    if (!t.getRecurringTransactions().contains(savedRec)) {
                        t.getRecurringTransactions().clear();
                        t.getRecurringTransactions().add(savedRec);
                    }
                } else {
                    // user turned OFF recurring: delete existing recurring rows
                    if (existing != null && !existing.isEmpty()) {
                        for (RecurringTransactionEntity r : new java.util.ArrayList<>(existing)) {
                            rrepo.deleteById(r.getRecID());
                        }
                        t.setRecurringTransactions(null);
                    }
                }
            } else {
                // If switched to income, remove any recurring entries linked
                if (t.getRecurringTransactions() != null && !t.getRecurringTransactions().isEmpty()) {
                    for (RecurringTransactionEntity r : new java.util.ArrayList<>(t.getRecurringTransactions())) {
                        rrepo.deleteById(r.getRecID());
                    }
                    t.setRecurringTransactions(null);
                }
            }
        } catch (Exception e) {
            // log but don't fail silently — rethrow as runtime so controller returns error
            throw new RuntimeException("Failed updating recurring transaction: " + e.getMessage(), e);
        }

        // ---- end recurrence handling ----

        return trepo.save(t);
    }



    // D - Delete a transaction
    // public String deleteTransaction(int tid) {
    //     String msg = "";
    //     if (trepo.existsById(tid)) {
    //         trepo.deleteById(tid);
    //         msg = "Transaction: " + tid + " is successfully deleted!";
    //     } else {
    //         msg = "Transaction: " + tid + " does not exist.";
    //     }
    //     return msg;
    // }
    public String deleteTransaction(int tid) {

        TransactionEntity t = trepo.findById(tid)
            .orElseThrow(() -> new NoSuchElementException("Transaction not found with ID: " + tid));

        // 1️⃣ DELETE RECURRING TRANSACTIONS FIRST
        if (t.getRecurringTransactions() != null && !t.getRecurringTransactions().isEmpty()) {
            for (RecurringTransactionEntity r : t.getRecurringTransactions()) {
                rrepo.deleteById(r.getRecID());
            }
        }

        // 2️⃣ DELETE EXPENSE OR INCOME (OPTIONAL BUT RECOMMENDED)
        if (t.getExpense() != null) {
            erepo.deleteById(t.getExpense().getExpenseID());
        }

        if (t.getIncome() != null) {
            irepo.deleteById(t.getIncome().getIncomeID());
        }

        // 3️⃣ DELETE TRANSACTION ITSELF
        trepo.deleteById(tid);

        return "Transaction " + tid + " deleted successfully";
    }


}