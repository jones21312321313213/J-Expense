package com.example.appdevf2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appdevf2.entity.ExpenseEntity;
import com.example.appdevf2.repository.ExpenseRepository;

@Service
public class ExpenseService 
{

    @Autowired
    private ExpenseRepository expenseRepository;

    //Create
    public ExpenseEntity saveExpense(ExpenseEntity expense) 
    {
        return expenseRepository.save(expense);
    }

    //Read all
    public List<ExpenseEntity> getAllExpenses() 
    {
        return expenseRepository.findAll();
    }
    
    //Read by ID
    public Optional<ExpenseEntity> getExpenseById(int id) 
    {
        return expenseRepository.findById(id);
    }

    //Update
    public ExpenseEntity updateExpense(int id, ExpenseEntity updatedExpense) 
    {
        return expenseRepository.findById(id)
            .map(expense -> {
                expense.setPayment_method(updatedExpense.getPayment_method());
                expense.setIs_recurring(updatedExpense.isIs_recurring());
                return expenseRepository.save(expense);
            }).orElse(null);
    }

    //Delete
    public void deleteExpense(int id) 
    {
        expenseRepository.deleteById(id);
    }
}
