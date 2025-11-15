package com.example.appdevf2.service;

import com.example.appdevf2.entity.BudgetEntity;
import com.example.appdevf2.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    // CREATE / UPDATE
    public BudgetEntity saveBudget(BudgetEntity budget) {
        return budgetRepository.save(budget);
    }

    // READ ALL
    public List<BudgetEntity> getAllBudgets() {
        return budgetRepository.findAll();
    }

    // READ BY ID
    public Optional<BudgetEntity> getBudgetById(int id) {
        return budgetRepository.findById(id);
    }

    // DELETE
    public void deleteBudget(int id) {
        budgetRepository.deleteById(id);
    }
}