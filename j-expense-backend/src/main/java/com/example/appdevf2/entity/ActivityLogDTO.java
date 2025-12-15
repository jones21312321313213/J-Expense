package com.example.appdevf2.entity;


import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ActivityLogDTO {
    private String type;        // "INCOME", "EXPENSE", "BUDGET", "GOAL"
    private String title;       // e.g., transaction name, budget name, goal name
    private Double amount;      // transaction amount, budget total, goal target
    private Date date;          // creation or modified date
    private String category;    // category name or goal type


}
