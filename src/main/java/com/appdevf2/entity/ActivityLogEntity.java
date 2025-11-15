package com.example.appdevf2.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_activity_log")
public class ActivityLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id")
    private int activityID;

    @Column(name = "amount")
    private double amount;

    @Column(name = "current_amount")
    private double currentAmount;

    @Column(name = "date_modified")
    private Date dateModified;

    @Column(name = "category")
    private String category;

    public ActivityLogEntity() {
        super();
    }

     public ActivityLogEntity(int activityID, double amount, double currentAmount, Date dateModified, String category) {
        super();
        this.activityID = activityID;
        this.amount = amount;
        this.currentAmount = currentAmount;
        this.dateModified = dateModified;
        this.category = category;
    }
    // Setters
    public void setActivityID(int activityID) {
        this.activityID = activityID;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public void setCurrentAmount(double currentAmount) {
        this.currentAmount = currentAmount;
    }
    public void setDateModified(Date dateModified) {
        this.dateModified = dateModified;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    // Getters
    public int getActivityID() {
        return activityID;
    }
    public double getAmount() {
        return amount;
    }
    public double getCurrentAmount() {
        return currentAmount;
    }
    public Date getDateModified() {
        return dateModified;
    }
    public String getCategory() {
        return category;
    }
    
}
