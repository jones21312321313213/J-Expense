package com.example.appdevf2.service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.repository.UserRepository;
@Service
public class UserService implements UserDetailsService {

    private final UserRepository urepo;
    private final PasswordEncoder encoder;

    @Autowired
    public UserService(UserRepository urepo, @Lazy PasswordEncoder encoder) {
        this.urepo = urepo;
        this.encoder = encoder;
    }

    // ===================== SPRING SECURITY =====================

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return urepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + username));
    }


    public UserEntity getByUsername(String username) {
        return urepo.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    // ===================== REGISTER USER =====================

    public UserEntity registerUser(UserEntity user) {

        if (user.getUsername() == null || user.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username is required");
        }

        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }

        // Encode password
        user.setPassword(encoder.encode(user.getPassword()));

        // Default role
        user.setRoles("ROLE_USER");

        // Creation date
        user.setCreation_date(new Date());

        return urepo.save(user);
    }

    // ===================== READ =====================

    public List<UserEntity> getAllUsers() {
        return urepo.findAll();
    }

    public UserEntity getUserById(int id) {
        return urepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    // ===================== UPDATE =====================

    public UserEntity updateUser(int uid, UserEntity newUserDetails) {

        UserEntity user = urepo.findById(uid)
                .orElseThrow(() ->
                        new NoSuchElementException("User " + uid + " not found"));

        user.setUsername(newUserDetails.getUsername());
        user.setEmail(newUserDetails.getEmail());

        // ONLY encode if password was changed
        if (newUserDetails.getPassword() != null &&
            !newUserDetails.getPassword().isBlank()) {

            user.setPassword(encoder.encode(newUserDetails.getPassword()));
        }

        return urepo.save(user);
    }

    // ===================== DELETE =====================

    public void deleteUser(int uid) {
        if (!urepo.existsById(uid)) {
            throw new NoSuchElementException("User not found");
        }
        urepo.deleteById(uid);
    }
}

