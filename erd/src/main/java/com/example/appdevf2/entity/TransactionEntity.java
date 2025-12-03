package com.example.appdevf2.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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

    public TransactionEntity() {
        super();
    }

    public TransactionEntity(int billID, double amount, Date creation_date, String description) {
        super();
        this.billID = billID;
        this.amount = amount;
        this.creation_date = creation_date;
        this.description = description;
    }

    // Setters
    public void setBillID(int billID) {
        this.billID = billID;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getters
    public int getBillID() {
        return billID;
    }

    public double getAmount() {
        return amount;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public String getDescription() {
        return description;
    }
}
