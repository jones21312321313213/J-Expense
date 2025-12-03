package com.example.appdevf2.service;

import com.example.appdevf2.entity.RecurringTransactionEntity;
import com.example.appdevf2.entity.TransactionEntity;
import com.example.appdevf2.repository.RecurringTransactionRepository;
import com.example.appdevf2.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class RecurringTransactionService {

    @Autowired
    private RecurringTransactionRepository recurringRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    public RecurringTransactionEntity create(RecurringTransactionEntity recurring) {
        return recurringRepo.save(recurring);
    }

    public List<RecurringTransactionEntity> getAll() {
        return recurringRepo.findAll();
    }

    public RecurringTransactionEntity getById(int id) {
        return recurringRepo.findById(id).orElseThrow(() -> new RuntimeException("Recurring transaction not found"));
    }

    public RecurringTransactionEntity update(int id, RecurringTransactionEntity updated) {
        RecurringTransactionEntity existing = getById(id);
        existing.setAmount(updated.getAmount());
        existing.setRecurringDate(updated.getRecurringDate());
        existing.setDescription(updated.getDescription());
        existing.setIntervalDays(updated.getIntervalDays());

        return recurringRepo.save(existing);
    }

    public void delete(int id) {
        recurringRepo.deleteById(id);
    }

    @Scheduled(cron = "@daily")
    public void processRecurringTransactions() {
        Date today = new Date();

        List<RecurringTransactionEntity> dueList = recurringRepo.findByRecurringDateBefore(today);

        for (RecurringTransactionEntity r : dueList) {

            TransactionEntity newTransaction = new TransactionEntity();
            newTransaction.setAmount(r.getAmount());
            newTransaction.setCreation_date(today);
            newTransaction.setDescription(r.getDescription());

            transactionRepo.save(newTransaction);


            Date nextDate = new Date(r.getRecurringDate().getTime() +
                    (long) r.getIntervalDays() * 24 * 60 * 60 * 1000);
            r.setRecurringDate(nextDate);

            recurringRepo.save(r);
        }
    }
}

