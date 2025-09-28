package com.example.gameapp.service;

import com.example.gameapp.model.Admin;
import com.example.gameapp.model.Transaction;
import com.example.gameapp.repository.AdminRepository;
import com.example.gameapp.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final TransactionRepository transactionRepository;

    public AdminServiceImpl(AdminRepository adminRepository, TransactionRepository transactionRepository) {
        this.adminRepository = adminRepository;
        this.transactionRepository = transactionRepository;
    }

    @Override
    public Admin addAdmin(Admin admin) {
        admin.setDate(new Date());
        return adminRepository.save(admin);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public List<Admin> getAdminsByDate(Date date) {
        return adminRepository.findByDate(date);
    }

    @Override
    public Admin updateDailyCollection(Date date) {
        double totalCollection = getTotalCollectionForDate(date);
        
        // Check if admin record exists for this date
        List<Admin> existingAdmins = adminRepository.findByDate(date);
        Admin admin;
        
        if (existingAdmins.isEmpty()) {
            // Create new admin record
            admin = new Admin();
            admin.setDate(date);
        } else {
            // Update existing admin record
            admin = existingAdmins.get(0);
        }
        
        admin.setAmount(totalCollection);
        return adminRepository.save(admin);
    }

    @Override
    public double getTotalCollectionForDate(Date date) {
        // Convert Date to LocalDate for comparison
        LocalDate targetDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        
        // Get all transactions for the date
        List<Transaction> allTransactions = transactionRepository.findAll();
        
        return allTransactions.stream()
                .filter(transaction -> {
                    LocalDate transactionDate = transaction.getDate().toInstant()
                            .atZone(ZoneId.systemDefault()).toLocalDate();
                    return transactionDate.equals(targetDate);
                })
                .mapToDouble(Transaction::getAmount)
                .sum();
    }
}
