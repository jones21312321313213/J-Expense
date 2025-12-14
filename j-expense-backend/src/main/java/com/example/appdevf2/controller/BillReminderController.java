package com.example.appdevf2.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.appdevf2.entity.BillReminderEntity;
import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.service.BillReminderService;
import com.example.appdevf2.service.UserService;

@RestController
@RequestMapping("/api/bills")
public class BillReminderController {       
    @Autowired
    BillReminderService service;
    
    @Autowired
    UserService userService;

    @GetMapping("/getAllBills")
    public List<BillReminderEntity> getAllBills() {
        return service.getAllBills();
    }

    @GetMapping("/{id}")
    public Optional<BillReminderEntity> getBillById(@PathVariable int id) {
        return service.getBillById(id);
    }

    @PostMapping
    public ResponseEntity<BillReminderEntity> createBill(@RequestBody BillReminderEntity bill, Authentication auth) {
        // Get the authenticated user from JWT
        UserEntity user = userService.getByUsername(auth.getName()); // or findByUsername(auth.getName())
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        bill.setUser(user); // <-- assign the user
        BillReminderEntity savedBill = service.saveBill(bill);

        return ResponseEntity.ok(savedBill);
    }


        @PutMapping("/{id}")
        public ResponseEntity<BillReminderEntity> updateBill(@PathVariable int id, @RequestBody BillReminderEntity updatedBill, Authentication auth) {
            UserEntity user = userService.getByUsername(auth.getName());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // Optional: Ensure the bill belongs to this user
            Optional<BillReminderEntity> existingBill = service.getBillById(id);
            if (existingBill.isEmpty() || existingBill.get().getUser().getUserID() != user.getUserID()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            updatedBill.setBillID(id);
            updatedBill.setUser(user); // preserve ownership
            BillReminderEntity savedBill = service.saveBill(updatedBill);

            return ResponseEntity.ok(savedBill);
        }


    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable int id) {
        service.deleteBill(id);
    }
}
