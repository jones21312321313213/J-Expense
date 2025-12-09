package com.example.appdevf2.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appdevf2.entity.ExpenseEntity;
import com.example.appdevf2.entity.IncomeEntity;
import com.example.appdevf2.entity.TransactionDTO;
import com.example.appdevf2.entity.TransactionEntity;
import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.repository.CategoryRepository;
import com.example.appdevf2.repository.ExpenseRepository;
import com.example.appdevf2.repository.IncomeRepository;
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

    // C - Create or insert transaction record
    // public TransactionEntity insertTransaction(TransactionEntity transaction) {
    // return trepo.save(transaction);
    // }




    public TransactionEntity insertTransaction(TransactionDTO dto) {

        // 1. Fetch User (and Category if available)
        UserEntity user = urepo.findById(dto.getUserID())
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + dto.getUserID()));
        

        TransactionEntity t = new TransactionEntity();
        t.setAmount(dto.getAmount());
        t.setCreation_date(dto.getCreation_date());
        t.setDescription(dto.getDescription());
        t.setName(dto.getName());
        t.setUser(user);

       
        t.setExpense(null);
        t.setIncome(null);

        
        if (dto.getIsIncome() != null && dto.getIsIncome()) {
            // --- IS INCOME ---
            t.setIncomeFlag(true);

            IncomeEntity income = new IncomeEntity();
            income.setType(dto.getType()); 
            
            // Save the new income entity to get its auto-generated ID
            IncomeEntity savedIncome = irepo.save(income); 
            t.setIncome(savedIncome);
            
        } else if (dto.getIsIncome() != null && !dto.getIsIncome()) {
            // --- IS EXPENSE ---
            t.setIncomeFlag(false);
            
            ExpenseEntity expense = new ExpenseEntity();
            expense.setPayment_method(dto.getPaymentMethod()); 
            expense.setReccuring(dto.getIsRecurring()); 
            
            // Save the new expense entity to get its auto-generated ID
            ExpenseEntity savedExpense = erepo.save(expense);
            t.setExpense(savedExpense);
        } else {
            
            throw new IllegalArgumentException("Transaction type (isIncome) must be specified.");
        }
        
        return trepo.save(t);
    }

    // R - Read all transaction records
    public List<TransactionEntity> getAllTransactions() {
        return trepo.findAll();
    }

    // R - read transaction by id
    public TransactionEntity getTransactionById(int id) {
        return trepo.findById(id).orElse(null);
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
    @SuppressWarnings("finally")
    public TransactionEntity updateTransaction(int tid, TransactionEntity newTransactionDetails) {
        TransactionEntity t = new TransactionEntity();
        try {
            // 1) Search the transaction by ID
            t = trepo.findById(tid).get();

            // 2) Update the record
            t.setAmount(newTransactionDetails.getAmount());
            t.setCreation_date(newTransactionDetails.getCreation_date());
            t.setDescription(newTransactionDetails.getDescription());

        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("Transaction: " + tid + " is not found");
        } finally {
            return trepo.save(t);
        }
    }

    // D - Delete a transaction
    public String deleteTransaction(int tid) {
        String msg = "";
        if (trepo.existsById(tid)) {
            trepo.deleteById(tid);
            msg = "Transaction: " + tid + " is successfully deleted!";
        } else {
            msg = "Transaction: " + tid + " does not exist.";
        }
        return msg;
    }
}
