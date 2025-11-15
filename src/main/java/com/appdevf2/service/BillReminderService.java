package com.example.appdevf2.service;
import com.example.appdevf2.entity.BillReminderEntity;
import com.example.appdevf2.repository.BillReminderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillReminderService {

    private final BillReminderRepository repository;

    public BillReminderService(BillReminderRepository repository) {
        this.repository = repository;
    }

    public List<BillReminderEntity> getAllBills() {
        return repository.findAll();
    }

    public Optional<BillReminderEntity> getBillById(int id) {
        return repository.findById(id);
    }

    public BillReminderEntity saveBill(BillReminderEntity bill) {
        return repository.save(bill);
    }

    public void deleteBill(int id) {
        repository.deleteById(id);
    }
}
