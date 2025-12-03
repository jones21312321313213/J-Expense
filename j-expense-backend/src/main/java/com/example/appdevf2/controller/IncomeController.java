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

import com.example.appdevf2.entity.IncomeEntity;
import com.example.appdevf2.service.IncomeService;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    // CREATE a new income
    @PostMapping("/create")
    public ResponseEntity<IncomeEntity> createIncome(@RequestBody IncomeEntity income) 
    {
        IncomeEntity savedIncome = incomeService.saveIncome(income);
        return new ResponseEntity<>(savedIncome, HttpStatus.CREATED); 
    }

    // READ ALL income
    @GetMapping("/all")
    public ResponseEntity<List<IncomeEntity>> getAllIncome() 
    {
        List<IncomeEntity> incomes = incomeService.getAllIncome();
        return new ResponseEntity<>(incomes, HttpStatus.OK); 
    }

    // READ a single income by ID
    @GetMapping("/view/{id}")
    public ResponseEntity<IncomeEntity> getIncomeById(@PathVariable int id) 
    {
        return incomeService.getIncomeById(id)
            .map(income -> new ResponseEntity<>(income, HttpStatus.OK)) 
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); 
    }

    // UPDATE an existing income
    @PutMapping("/update/{id}")
    public ResponseEntity<IncomeEntity> updateIncome(@PathVariable int id, @RequestBody IncomeEntity income) 
    {
        IncomeEntity updatedIncome = incomeService.updateIncome(id, income);
        if (updatedIncome != null) 
        {
            return new ResponseEntity<>(updatedIncome, HttpStatus.OK); 
        } 
        else 
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }

    // DELETE an income by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable int id) 
    {
        boolean exists = incomeService.getIncomeById(id).isPresent();
        if (exists) 
        {
            incomeService.deleteIncome(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
            
        } 
        else 
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }
}