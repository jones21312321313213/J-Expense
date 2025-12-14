package com.example.appdevf2.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
import com.example.appdevf2.repository.UserRepository;
import com.example.appdevf2.service.JwtService;
import com.example.appdevf2.service.UserService;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userv;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userv,
                          JwtService jwtService,
                          AuthenticationManager authenticationManager,
                          UserRepository userRepository) {
        this.userv = userv;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(),
                authRequest.getPassword()
            )
        );

        UserEntity user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtService.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getUserID());
        response.put("username", user.getUsername());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserEntity user) {

        System.out.println("USERNAME = " + user.getUsername());
        System.out.println("PASSWORD = " + user.getPassword());


        user.setRoles("USER"); // auto role
        userv.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }





    // LOGOUT (client-side token deletion is enough)
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // clear context (stateless) - optional
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Logout successful. Please delete token on client.");
        return ResponseEntity.ok(response);
    }

    // other user endpoints still call UserService (unchanged)
    @GetMapping("/user/all")
    public List<?> getAllUsers() {
        return userv.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        return userv.getUserById(id) != null ? ResponseEntity.ok(userv.getUserById(id)) : ResponseEntity.notFound().build();
    }

    @PutMapping("/user/update")
    public Object updateUser(@RequestParam int uid, @RequestBody UserEntity newUserDetails) {
        return userv.updateUser(uid, newUserDetails);
    }

    @DeleteMapping("/user/delete/{uid}")
    public String deleteUser(@PathVariable int uid) {
        return userv.deleteUser(uid);
    }
}
