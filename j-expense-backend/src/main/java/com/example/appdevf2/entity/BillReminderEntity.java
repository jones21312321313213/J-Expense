package com.example.appdevf2.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    // public BillReminderEntity() {super();}
    // public BillReminderEntity(int billID, String billName, double amount, Date dueDate, boolean status) {
    //     super();
    //     this.billID = billID;
    //     this.billName = billName;
    //     this.amount = amount;
    //     this.dueDate = dueDate;
    //     this.status = status;
    // }

    // public int getBillID() { return billID; }
    // public void setBillID(int billID) { this.billID = billID; }

    // public String getBillName() { return billName; }
    // public void setBillName(String billName) { this.billName = billName; }

    // public double getAmount() { return amount; }
    // public void setAmount(double amount) { this.amount = amount; }

    // public Date getDueDate() { return dueDate; }
    // public void setDueDate(Date dueDate) { this.dueDate = dueDate; }

    // public boolean isStatus() { return status; }
    // public void setStatus(boolean status) { this.status = status; }
}
