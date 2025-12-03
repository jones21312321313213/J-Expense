package com.example.appdevf2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.appdevf2.entity.ExpenseEntity;
import com.example.appdevf2.service.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController 
{
    @Autowired
    private ExpenseService expenseService;

    // CREATE a new expense
    @PostMapping("/create")
    public ResponseEntity<ExpenseEntity> createExpense(@RequestBody ExpenseEntity expense) 
    {
        ExpenseEntity savedExpense = expenseService.saveExpense(expense);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED); 
    }

    // READ all expenses
    @GetMapping("/all")
    public ResponseEntity<List<ExpenseEntity>> getAllExpenses() 
    {
        List<ExpenseEntity> expenses = expenseService.getAllExpenses();
        return new ResponseEntity<>(expenses, HttpStatus.OK); 
    }

    // READ a single expense by ID
    @GetMapping("/view/{id}")
    public ResponseEntity<ExpenseEntity> getExpenseById(@PathVariable int id) 
    {
        return expenseService.getExpenseById(id)
            .map(expense -> new ResponseEntity<>(expense, HttpStatus.OK)) 
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); 
    }

    // UPDATE an existing expense
    @PutMapping("/update/{id}")
    public ResponseEntity<ExpenseEntity> updateExpense(@PathVariable int id, @RequestBody ExpenseEntity expense) 
    {
        ExpenseEntity updatedExpense = expenseService.updateExpense(id, expense);
        if (updatedExpense != null) 
        {
            return new ResponseEntity<>(updatedExpense, HttpStatus.OK); 
        } 
        else 
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }

    // DELETE an expense by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable int id) 
    {
        boolean exists = expenseService.getExpenseById(id).isPresent();
        if (exists) 
        {
            expenseService.deleteExpense(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        } 
        else 
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }
}