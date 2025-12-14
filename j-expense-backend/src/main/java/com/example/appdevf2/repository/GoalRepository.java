package com.example.appdevf2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.appdevf2.entity.GoalEntity;

@Repository
public interface GoalRepository extends JpaRepository<GoalEntity,Integer> {
    List<GoalEntity> findByUser_UserID(int userId);
}

