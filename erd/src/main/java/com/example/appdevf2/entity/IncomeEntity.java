package com.example.appdevf2.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_income")
public class IncomeEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "income_id")
    private int incomeID;

    @Column(name = "type")
    private String type;

    public IncomeEntity() {
        super();
    }

    public IncomeEntity(int incomeID, String type) 
    {
        super();
        this.incomeID = incomeID;
        this.type = type;
    }
    
    //getters
    public int getIncomeID() 
    {
        return incomeID;
    }
    public String getType() 
    {
        return type;
    }

    //setters
    public void setIncomeID(int incomeID) 
    {
        this.incomeID = incomeID;
    }
    
    public void setType(String type) 
    {
        this.type = type;
    }

}
