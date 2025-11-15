package com.example.appdevf2.controller;

import com.example.appdevf2.entity.BillReminderEntity;
import com.example.appdevf2.service.BillReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bills")
public class BillReminderController {
    @Autowired
    BillReminderService service;

    @GetMapping("/getAllBills")
    public List<BillReminderEntity> getAllBills() {
        return service.getAllBills();
    }

    @GetMapping("/{id}")
    public Optional<BillReminderEntity> getBillById(@PathVariable int id) {
        return service.getBillById(id);
    }

    @PostMapping
    public BillReminderEntity createBill(@RequestBody BillReminderEntity bill) {
        return service.saveBill(bill);
    }

    @PutMapping("/{id}")
    public BillReminderEntity updateBill(@PathVariable int id, @RequestBody BillReminderEntity updatedBill) {
        updatedBill.setBillID(id);
        return service.saveBill(updatedBill);
    }

    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable int id) {
        service.deleteBill(id);
    }
}
