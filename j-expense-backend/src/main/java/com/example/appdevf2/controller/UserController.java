package com.example.appdevf2.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.appdevf2.entity.AuthRequest;
import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.entity.UserInfo;
import com.example.appdevf2.repository.UserInfoRepository;
import com.example.appdevf2.service.JwtService;
import com.example.appdevf2.service.UserService;

@RestController
@RequestMapping("/auth") // Base endpoint for login and registration
public class UserController {

    private final UserService userv;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired //this method is in ssecurity config
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    public UserController(UserService userv, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userv = userv;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    // =========================
    // LOGIN ENDPOINT
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            String token = jwtService.generateToken(authRequest.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login failed: " + ex.getMessage());
            return ResponseEntity.status(401).body(response);
        }
    }


    // =========================
    // LOGOUT ENDPOINT
    // =========================
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Clear security context
        SecurityContextHolder.clearContext();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Logout successful. Please delete token on client.");

        return ResponseEntity.ok(response);
    }


    // =========================
    // GENERATE TOKEN ENDPOINT
    // =========================
    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    // =========================
    // REGISTER / CREATE USER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody UserInfo user) {
        // encode first
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserInfo savedUser = userInfoRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // =========================
    // OTHER ENDPOINTS (JWT required)
    // =========================
    @GetMapping("/user/all")
    public List<UserEntity> getAllUsers() {
        return userv.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable int id) {
        UserEntity user = userv.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PutMapping("/user/update")
    public UserEntity updateUser(@RequestParam int uid, @RequestBody UserEntity newUserDetails) {
        return userv.updateUser(uid, newUserDetails);
    }

    @DeleteMapping("/user/delete/{uid}")
    public String deleteUser(@PathVariable int uid) {
        return userv.deleteUser(uid);
    }
}
