package com.example.appdevf2.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.appdevf2.entity.ActivityLogDTO;
import com.example.appdevf2.entity.ActivityLogEntity;
import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.service.ActivityLogService;
import com.example.appdevf2.service.UserService;

@RestController
@RequestMapping("/api/logs")

public class ActivityLogController {

    private final ActivityLogService activityLogService;
    private final UserService userService;

    @Autowired
    public ActivityLogController(ActivityLogService activityLogService, UserService userService) {
        this.activityLogService = activityLogService;
        this.userService = userService;
    }

    // 🔹 Get all activities for logged-in user
    @GetMapping("/user")
    public ResponseEntity<List<ActivityLogDTO>> getUserActivities(Principal principal) {
        UserEntity user = userService.getByUsername(principal.getName());
        List<ActivityLogDTO> activities = activityLogService.getUserActivities(user.getUserID());
        return ResponseEntity.ok(activities);
    }

    // Optional CRUD endpoints
    @PostMapping
    public ResponseEntity<ActivityLogEntity> create(@RequestBody ActivityLogEntity log) {
        return ResponseEntity.ok(activityLogService.save(log));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityLogEntity> getById(@PathVariable int id) {
        return activityLogService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ActivityLogEntity> update(
            @PathVariable int id,
            @RequestBody ActivityLogEntity updatedLog) {

        return activityLogService.getById(id).map(existing -> {
            existing.setAmount(updatedLog.getAmount());
            existing.setCategory(updatedLog.getCategory());
            existing.setDateModified(updatedLog.getDateModified());
            return ResponseEntity.ok(activityLogService.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (activityLogService.getById(id).isPresent()) {
            activityLogService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
