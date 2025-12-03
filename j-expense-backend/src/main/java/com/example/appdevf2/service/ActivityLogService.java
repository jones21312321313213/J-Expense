package com.example.appdevf2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.appdevf2.entity.ActivityLogEntity;
import com.example.appdevf2.repository.ActivityLogRepository;

@Service
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    // Create or Update
    public ActivityLogEntity save(ActivityLogEntity activityLog) {
        return activityLogRepository.save(activityLog);
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
