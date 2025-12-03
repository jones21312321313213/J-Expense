package com.example.appdevf2.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.appdevf2.entity.ActivityLogEntity;
import com.example.appdevf2.service.ActivityLogService;

@RestController
@RequestMapping("/api/logs")

public class ActivityLogController {

    private final ActivityLogService activityLogService;

    public ActivityLogController(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ActivityLogEntity> create(@RequestBody ActivityLogEntity log) {
        return ResponseEntity.ok(activityLogService.save(log));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<ActivityLogEntity>> getAll() {
        return ResponseEntity.ok(activityLogService.getAll());
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ActivityLogEntity> getById(@PathVariable int id) {
        return activityLogService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
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

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (activityLogService.getById(id).isPresent()) {
            activityLogService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
