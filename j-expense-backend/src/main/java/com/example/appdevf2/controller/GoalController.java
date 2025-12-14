package com.example.appdevf2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.example.appdevf2.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
public class GoalController {

    @Autowired
    private GoalService goalService;

    @Autowired
    private JwtService jwtService;


    @PostMapping("/addGoal")
    public GoalEntity addGoal(@RequestBody GoalEntity goal, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }

        String token = authHeader.substring(7);
        int userId = jwtService.extractUserId(token);
        return goalService.saveGoal(goal, userId); // <-- link goal to user
    }


    @GetMapping("/my-goals")
    public List<GoalEntity> getMyGoals(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }

        String token = authHeader.substring(7);
        int userId = jwtService.extractUserId(token); // get userId from JWT
        return goalService.getGoalsByUser(userId); // fetch only goals for this user
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
        // goalType and progress can be updated here
        return goalService.updateGoal(id, goal);
    }

    // Delete Goal
    @DeleteMapping("/deleteGoal/{id}")
    public String deleteGoal(@PathVariable int id) {
        boolean deleted = goalService.deleteGoal(id);
        return deleted ? "Goal deleted successfully." : "Goal not found.";
    }

    private static class jwtService {

        public jwtService() {
        }
    }
}
