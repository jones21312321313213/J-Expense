package com.example.appdevf2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appdevf2.entity.GoalEntity;
import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.repository.GoalRepository;

@Service
public class GoalService {

    @Autowired
    private UserService userService;

    @Autowired
    private GoalRepository goalRepository;

    // Create or Update Goal
    public GoalEntity saveGoal(GoalEntity goal) {
        return goalRepository.save(goal);
    }

    // Read All Goals
    public List<GoalEntity> getAllGoals() {
        return goalRepository.findAll();
    }

    // Read Goal by ID
    public GoalEntity getGoalById(int id) {
        return goalRepository.findById(id).orElse(null);
    }

    public List<GoalEntity> getGoalsByUser(int userId) {
        return goalRepository.findByUser_UserID(userId);
    }

    public GoalEntity saveGoal(GoalEntity goal, int userId) {
        UserEntity user = userService.getUserById(userId);
        goal.setUser(user);
        return goalRepository.save(goal);
    }

    

    // Update Goal
    public GoalEntity updateGoal(int id, GoalEntity updatedGoal) {
        GoalEntity existingGoal = goalRepository.findById(id).orElse(null);

        if (existingGoal != null) {
            existingGoal.setGoalName(updatedGoal.getGoalName());
            existingGoal.setTargetAmount(updatedGoal.getTargetAmount());
            existingGoal.setCurrentAmount(updatedGoal.getCurrentAmount());
            existingGoal.setStartDate(updatedGoal.getStartDate());
            existingGoal.setEndDate(updatedGoal.getEndDate());
            existingGoal.setGoalType(updatedGoal.getGoalType());   // ✅ new field
            existingGoal.setProgress(updatedGoal.getProgress());   // ✅ new field
            return goalRepository.save(existingGoal);
        }

        return null;
    }

    // Delete Goal
    public boolean deleteGoal(int id) {
        if (goalRepository.existsById(id)) {
            goalRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
