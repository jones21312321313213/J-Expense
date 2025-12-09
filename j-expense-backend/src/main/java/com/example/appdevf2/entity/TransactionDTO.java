package com.example.appdevf2.entity;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionDTO {
    private double amount;
    private Date creation_date;
    private String description;
    private String name;
    private String username;
    private Integer  categoryID; 

}