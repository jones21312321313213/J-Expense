package com.example.appdevf2.entity;

import java.util.Date;

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


    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;


}
