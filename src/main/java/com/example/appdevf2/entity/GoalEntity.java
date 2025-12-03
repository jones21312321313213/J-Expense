package com.example.appdevf2.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_goal")
public class GoalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private int goalID;

    @Column(name = "goal_name")
    private String goalName;

    @Column(name = "target_amount")
    private double targetAmount;

    @Column(name = "current_amount")
    private double currentAmount;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    public GoalEntity() {
        super();
    }

     public GoalEntity(int goalID, String goalName, double targetAmount, double currentAmount, Date startDate, Date endDate) {
        super();
        this.goalID = goalID;
        this.goalName = goalName;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    //Setters
    
    public void setGoalID(int goalID) { 
        this.goalID = goalID; 
    }

    public void setGoalName(String goalName) { 
        this.goalName = goalName; 
    }

    public void setTargetAmount(double targetAmount) { 
        this.targetAmount = targetAmount; 
    }

    public void setCurrentAmount(double currentAmount) { 
        this.currentAmount = currentAmount; 
    }

    public void setStartDate(Date startDate) { 
        this.startDate = startDate; 
    }

    public void setEndDate(Date endDate) { 
        this.endDate = endDate; 
    }
    
    // Getters
    public int getGoalID() {
        return goalID; 
    }

    public String getGoalName() { 
        return goalName; 
    }

    public double getTargetAmount() {
        return targetAmount; 
    }

    public double getCurrentAmount() { 
        return currentAmount; 
    }

    public Date getStartDate() { 
        return startDate; 
    }

    public Date getEndDate() { 
        return endDate; 
    }

}