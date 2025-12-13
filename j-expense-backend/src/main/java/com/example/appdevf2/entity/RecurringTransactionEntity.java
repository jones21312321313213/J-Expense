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
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbl_rectransaction")
public class RecurringTransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_id")
    private int recID;

    @Column(name = "amount")
    private double amount;

    @Column(name = "recurring_date")
    private Date recurringDate;

    @Column(name = "description")
    private String description;

    @Column(name = "interval_days")
    private int intervalDays;


    @ManyToOne
    @JoinColumn(name = "transaction_id")
    @JsonIgnoreProperties({"recurringTransactions"}) 
    private TransactionEntity transaction;


    @ManyToOne
    @JoinColumn(name = "user_id") // FK column
    private UserEntity user; 


    // public RecurringTransactionEntity() {
    //     super();
    // }

    // public RecurringTransactionEntity(int recID, double amount, Date recurringDate, String description, int intervalDays) {
    //     super();
    //     this.recID = recID;
    //     this.amount = amount;
    //     this.recurringDate = recurringDate;
    //     this.description = description;
    //     this.intervalDays = intervalDays;
    // }

    // public int getIntervalDays() {
    //     return intervalDays;
    // }

    // public void setIntervalDays(int intervalDays) {
    //     this.intervalDays = intervalDays;
    // }

    // public String getDescription() {
    //     return description;
    // }

    // public void setDescription(String description) {
    //     this.description = description;
    // }

    // public Date getRecurringDate() {
    //     return recurringDate;
    // }

    // public void setRecurringDate(Date recurringDate) {
    //     this.recurringDate = recurringDate;
    // }

    // public double getAmount() {
    //     return amount;
    // }

    // public void setAmount(double amount) {
    //     this.amount = amount;
    // }

    // public int getRecID() {
    //     return recID;
    // }

    // public void setRecID(int recID) {
    //     this.recID = recID;
    // }
}