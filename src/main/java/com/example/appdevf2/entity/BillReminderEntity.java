package com.example.appdevf2.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tbl_bills")
public class BillReminderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billID;
    private String billName;
    private double amount;

    @Temporal(TemporalType.DATE)
    private Date dueDate;
    private boolean status;

    public BillReminderEntity() {super();}
    public BillReminderEntity(int billID, String billName, double amount, Date dueDate, boolean status) {
        super();
        this.billID = billID;
        this.billName = billName;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
    }

    public int getBillID() { return billID; }
    public void setBillID(int billID) { this.billID = billID; }

    public String getBillName() { return billName; }
    public void setBillName(String billName) { this.billName = billName; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public Date getDueDate() { return dueDate; }
    public void setDueDate(Date dueDate) { this.dueDate = dueDate; }

    public boolean isStatus() { return status; }
    public void setStatus(boolean status) { this.status = status; }
}
