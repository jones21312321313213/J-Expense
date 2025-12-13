package com.example.appdevf2.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "tbl_budget")
public class BudgetEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private int budgetID;

    @Column(name = "type")
    private String type;

    @Column(name = "name")
    private String name;

    @Column(name = "category_name")
    private String category_name;

    @Column(name = "total_amount")
    private double total_amount;

    @Column(name = "period")
    private String period;

    @Column(name = "beginning")
    private LocalDate beginning;

    @Column(name = "frequency")
    private Integer frequency; // Changed from int to Integer

    // Default constructor
    public BudgetEntity() {
        super();
    }

    // Full constructor - update frequency parameter type
    public BudgetEntity(int budgetID, String type, String name, String category_name, 
                        double total_amount, String period, LocalDate beginning, Integer frequency) {
        super();
        this.budgetID = budgetID;
        this.type = type;
        this.name = name;
        this.category_name = category_name;
        this.total_amount = total_amount;
        this.period = period;
        this.beginning = beginning;
        this.frequency = frequency;
    }

    // Getters
    public int getBudgetID() {
        return budgetID;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
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

    public LocalDate getBeginning() {
        return beginning;
    }

    public Integer getFrequency() { // Changed return type
        return frequency;
    }

    // Setters
    public void setBudgetID(int budgetID) {
        this.budgetID = budgetID;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setName(String name) {
        this.name = name;
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

    public void setBeginning(LocalDate beginning) {
        this.beginning = beginning;
    }

    public void setFrequency(Integer frequency) { // Changed parameter type
        this.frequency = frequency;
    }
}