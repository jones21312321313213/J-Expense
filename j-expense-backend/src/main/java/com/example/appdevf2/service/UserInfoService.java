// src/main/java/com/example/appdevf2/service/UserInfoService.java
package com.example.appdevf2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.appdevf2.entity.UserInfo;
import com.example.appdevf2.repository.UserInfoRepository;

@Service
public class UserInfoService implements UserDetailsService {
    
    private final UserInfoRepository repository;
    private final PasswordEncoder encoder;

    @Autowired
    public UserInfoService(UserInfoRepository repository, @Lazy PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo user = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Ensure the role is not null/empty and has ROLE_ prefix
        String role = user.getRoles();
        if (role == null || role.isBlank()) {
            role = "ROLE_USER"; // default role if missing
        } else if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),          // use username
                user.getPassword(),          // hashed password
                List.of(new SimpleGrantedAuthority(role)) // fixed authority
        );
    }


    public String addUser(UserInfo userInfo) {
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User added successfully";
    }
}
