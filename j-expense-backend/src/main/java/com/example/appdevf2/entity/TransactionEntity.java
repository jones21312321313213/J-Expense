package com.example.appdevf2.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbl_transaction")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id")
    private int billID;

    @Column(name = "amount")
    private double amount;

    @Column(name = "creation_date")
    private Date creation_date;

    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name; 

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"transactions"}) // prevents infinite loop
    private UserEntity user;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;
    
    @OneToOne
    @JoinColumn(name = "expense_id") 
    private ExpenseEntity expense;

    @OneToOne
    @JoinColumn(name = "income_id") 
    private IncomeEntity income;

    @ManyToOne
    @JoinColumn(name = "activity_log_id") 
    private ActivityLogEntity activityLog;

    @ManyToOne
    @JoinColumn(name = "recurring_transaction_id")
    private RecurringTransactionEntity recurringTransaction;

}