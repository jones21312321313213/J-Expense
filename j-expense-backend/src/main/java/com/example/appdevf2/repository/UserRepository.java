package com.example.appdevf2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.appdevf2.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer>{
}
