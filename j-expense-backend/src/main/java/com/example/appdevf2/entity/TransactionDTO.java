package com.example.appdevf2.entity;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

// In com.example.appdevf2.entity.TransactionDTO

@Getter
@Setter
public class TransactionDTO {
    private double amount;
    private Date creation_date;
    private String description;
    private String name;
    private int userID;
    private int categoryID; // Also include category ID if needed

    private Boolean isIncome; // Flag to determine type 

    // Fields needed for IncomeEntity (based on IncomeEntity structure)
    private String type; 
    
    // Fields needed for ExpenseEntity (based on ExpenseEntity structure)
    private String paymentMethod; 
    private Boolean isRecurring; 
    private Integer intervalDays;
    private Date recurringDate;

}