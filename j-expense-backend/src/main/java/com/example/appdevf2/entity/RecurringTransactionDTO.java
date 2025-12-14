package com.example.appdevf2.entity;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecurringTransactionDTO {
    private double amount;
    private Date recurringDate;
    private int intervalDays;
    private int transactionId;

    private int userId;
}
