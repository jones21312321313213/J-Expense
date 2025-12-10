package com.example.appdevf2.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    
    @OneToOne(optional = true)
    @JoinColumn(name = "expense_id", nullable = true) 
    private ExpenseEntity expense;

    @OneToOne(optional = true)
    @JoinColumn(name = "income_id", nullable = true) 
    private IncomeEntity income;


    @Column(name = "is_income")
    private Boolean incomeFlag;


    @ManyToOne
    @JoinColumn(name = "activity_log_id") 
    private ActivityLogEntity activityLog;

    @OneToMany(mappedBy = "transaction")
    @JsonIgnoreProperties({"transaction"}) 
    private List<RecurringTransactionEntity> recurringTransactions;


}