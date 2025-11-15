package com.example.appdevf2.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_budget")
public class BudgetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private int budgetID;

    @Column(name = "category_name")
    private String category_name;

    @Column(name = "total_amount")
    private double total_amount;

    @Column(name = "period")
    private String period;

    public BudgetEntity() {
        super();
    }

    public BudgetEntity(int budgetID, String category_name, double total_amount, String period) {
        super();
        this.budgetID = budgetID;
        this.category_name = category_name;
        this.total_amount = total_amount;
        this.period = period;
    }

    // Setters
    public void setBudgetID(int budgetID) {
        this.budgetID = budgetID;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public void setTotal_amount(double total_amount) {
        this.total_amount = total_amount;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    // Getters
    public int getBudgetID() {
        return budgetID;
    }

    public String getCategory_name() {
        return category_name;
    }

    public double getTotal_amount() {
        return total_amount;
    }

    public String getPeriod() {
        return period;
    }
}