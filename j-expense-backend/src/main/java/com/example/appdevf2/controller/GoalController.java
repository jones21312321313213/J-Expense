package com.example.appdevf2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.appdevf2.entity.GoalEntity;
import com.example.appdevf2.service.GoalService;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    // Create Goal
    @PostMapping("/addGoal")
    public GoalEntity addGoal(@RequestBody GoalEntity goal) {
        return goalService.saveGoal(goal);
    }

    // Get All Goals
    @GetMapping("/allGoals")
    public List<GoalEntity> getAllGoals() {
        return goalService.getAllGoals();
    }

    // Get Goal by ID
    @GetMapping("/getGoal/{id}")
    public GoalEntity getGoalById(@PathVariable int id) {
        return goalService.getGoalById(id);
    }

    // Update Goal
    @PutMapping("/updateGoal/{id}")
    public GoalEntity updateGoal(@PathVariable int id, @RequestBody GoalEntity goal) {
        return goalService.updateGoal(id, goal);
    }

    // Delete Goal
    @DeleteMapping("/deleteGoal/{id}")
    public String deleteGoal(@PathVariable int id) {
        boolean deleted = goalService.deleteGoal(id);
        return deleted ? "Goal deleted successfully." : "Goal not found.";
    }
}
