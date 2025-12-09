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

import com.example.appdevf2.entity.BudgetEntity;
import com.example.appdevf2.service.BudgetService;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    // POST: Create a new Budget
    @PostMapping
    public ResponseEntity<BudgetEntity> createBudget(@RequestBody BudgetEntity budget) {
        BudgetEntity savedBudget = budgetService.saveBudget(budget);
        return new ResponseEntity<>(savedBudget, HttpStatus.CREATED);
    }

    // GET: Get all Budgets
    @GetMapping
    public ResponseEntity<List<BudgetEntity>> getAllBudgets() {
        List<BudgetEntity> budgets = budgetService.getAllBudgets();
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

    // GET: Get Budget by ID
    @GetMapping("/{budgetID}")
    public ResponseEntity<BudgetEntity> getBudgetById(@PathVariable int budgetID) {
        return budgetService.getBudgetById(budgetID)
                .map(budget -> new ResponseEntity<>(budget, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // PUT: Update an existing Budget
    @PutMapping("/{budgetID}")
    public ResponseEntity<BudgetEntity> updateBudget(@PathVariable int budgetID, @RequestBody BudgetEntity budgetDetails) {
        return budgetService.getBudgetById(budgetID)
                .map(existingBudget -> {
                    // Update fields
                    existingBudget.setType(budgetDetails.getType());
                    existingBudget.setName(budgetDetails.getName());
                    existingBudget.setCategory_name(budgetDetails.getCategory_name());
                    existingBudget.setTotal_amount(budgetDetails.getTotal_amount());
                    existingBudget.setPeriod(budgetDetails.getPeriod());
                    existingBudget.setBeginning(budgetDetails.getBeginning());
                    existingBudget.setFrequency(budgetDetails.getFrequency());
                    
                    BudgetEntity updatedBudget = budgetService.saveBudget(existingBudget);
                    return new ResponseEntity<>(updatedBudget, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // DELETE: Delete Budget by ID
    @DeleteMapping("/{budgetID}")
    public ResponseEntity<Void> deleteBudget(@PathVariable int budgetID) {
        if (budgetService.getBudgetById(budgetID).isPresent()) {
            budgetService.deleteBudget(budgetID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}