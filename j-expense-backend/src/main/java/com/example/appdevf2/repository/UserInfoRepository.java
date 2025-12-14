package com.example.appdevf2.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.appdevf2.entity.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer>{
    Optional<UserInfo> findByUsername(String username);
}
