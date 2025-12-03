package com.example.appdevf2.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_expense")
public class ExpenseEntity 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private int expenseID;

    @Column(name = "payment_method")
    private String payment_method;

    @Column(name = "is_recurring")
    private boolean is_recurring;

    public ExpenseEntity() {
        super();
    }

    public ExpenseEntity(int expenseID, String payment_method, boolean is_recurring) 
    {
        super();
        this.expenseID = expenseID;
        this.payment_method = payment_method;
        this.is_recurring = is_recurring;
    }
    
    //setters
    public void setExpenseID(int expense_id)
    {
        this.expenseID = expense_id;
    }
    public void setPayment_method(String payment_method) 
    {
        this.payment_method = payment_method;
    }
    public void setIs_recurring(boolean is_recurring)
    {
        this.is_recurring = is_recurring;
    }

    //getters
    public int getExpenseID() 
    {
        return expenseID;
    }
    public String getPayment_method() 
    {
        return payment_method;
    }
    
    public boolean isIs_recurring() 
    {
        return is_recurring;
    }
}
