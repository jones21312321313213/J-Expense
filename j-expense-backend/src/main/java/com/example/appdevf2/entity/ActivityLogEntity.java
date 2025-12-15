package com.example.appdevf2.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbl_activity_log")
public class ActivityLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id")
    private int activityID;

    @Column(name = "amount")
    private double amount;

    @Column(name = "date_modified")
    private Date dateModified;

    @Column(name = "category")
    private String category;

 
    
}
