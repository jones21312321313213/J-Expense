package com.example.appdevf2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appdevf2.entity.IncomeEntity;
import com.example.appdevf2.repository.IncomeRepository;

@Service
public class IncomeService 
{

    @Autowired
    private IncomeRepository incomeRepository;
    
    //Create
    public IncomeEntity saveIncome(IncomeEntity income) 
    {
        return incomeRepository.save(income);
    }

    //Read all
    public List<IncomeEntity> getAllIncome() 
    {
        return incomeRepository.findAll();
    }

    //Read by ID
    public Optional<IncomeEntity> getIncomeById(int id) 
    {
        return incomeRepository.findById(id);
    }

    //Update
    public IncomeEntity updateIncome(int id, IncomeEntity updatedIncome) 
    {
        return incomeRepository.findById(id)
            .map(income -> {
                income.setType(updatedIncome.getType());
                return incomeRepository.save(income);
            }).orElse(null);
    }

    //Delete
    public void deleteIncome(int id) 
    {
        incomeRepository.deleteById(id);
    }
}
