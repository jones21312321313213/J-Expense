package com.example.appdevf2.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appdevf2.entity.ActivityLogDTO;
import com.example.appdevf2.entity.ActivityLogEntity;
import com.example.appdevf2.entity.BudgetEntity;
import com.example.appdevf2.entity.GoalEntity;
import com.example.appdevf2.entity.TransactionEntity;
import com.example.appdevf2.repository.ActivityLogRepository;

@Service
public class ActivityLogService {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private GoalService goalService;

    @Autowired
    private BudgetService budgetService;

    private final ActivityLogRepository activityLogRepository;

    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    // Save or update a log
    public ActivityLogEntity save(ActivityLogEntity activityLog) {
        return activityLogRepository.save(activityLog);
    }

    // Get unified activity log for a user
    public List<ActivityLogDTO> getUserActivities(int userId) {
        List<ActivityLogDTO> activities = new ArrayList<>();

        // 🔹 Transactions
        List<TransactionEntity> transactions = transactionService.getTransactionsByUser(userId);
        for (TransactionEntity t : transactions) {
            String type = t.getIncomeFlag() ? "INCOME" : "EXPENSE";
            activities.add(new ActivityLogDTO(
                type,                     // Type: INCOME or EXPENSE
                t.getName(),              // Title
                t.getAmount(),            // Amount
                t.getCreation_date() != null ? t.getCreation_date() : new java.util.Date(), // fallback today
                type
            ));
        }

        // 🔹 Goals
        List<GoalEntity> goals = goalService.getGoalsByUser(userId);
        for (GoalEntity g : goals) {
            activities.add(new ActivityLogDTO(
                "GOAL",
                g.getGoalName(),
                g.getTargetAmount(),
                g.getStartDate() != null ? g.getStartDate() : new java.util.Date(),
               "GOAL"
            ));
        }

        // 🔹 Budgets
        List<BudgetEntity> budgets = budgetService.getBudgetsByUserId(userId);
        for (BudgetEntity b : budgets) {
            activities.add(new ActivityLogDTO(
                "BUDGET",
                b.getName(),
                b.getTotal_amount(),
                b.getBeginning() != null ? java.sql.Date.valueOf(b.getBeginning()) : new java.util.Date(),
                "BUDGET"
            ));
        }

        // Sort by date descending
        activities.sort((a, b) -> b.getDate().compareTo(a.getDate()));

        return activities;
    }

    // Get all logs
    public List<ActivityLogEntity> getAll() {
        return activityLogRepository.findAll();
    }

    // Get log by ID
    public Optional<ActivityLogEntity> getById(int id) {
        return activityLogRepository.findById(id);
    }

    // Delete log
    public void deleteById(int id) {
        activityLogRepository.deleteById(id);
    }
}
