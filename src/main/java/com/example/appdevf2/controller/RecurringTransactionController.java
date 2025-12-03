package com.example.appdevf2.controller;

import com.example.appdevf2.entity.RecurringTransactionEntity;
import com.example.appdevf2.service.RecurringTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recurring")
@CrossOrigin
public class RecurringTransactionController {

    @Autowired
    private RecurringTransactionService service;

    @PostMapping
    public RecurringTransactionEntity create(@RequestBody RecurringTransactionEntity r) {
        return service.create(r);
    }

    @GetMapping
    public List<RecurringTransactionEntity> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public RecurringTransactionEntity getById(@PathVariable int id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public RecurringTransactionEntity update(@PathVariable int id, @RequestBody RecurringTransactionEntity r) {
        return service.update(id, r);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }

    @PostMapping("/process")
    public void processNow() {
        service.processRecurringTransactions();
    }
}