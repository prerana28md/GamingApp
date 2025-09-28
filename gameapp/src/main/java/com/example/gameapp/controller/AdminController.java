package com.example.gameapp.controller;

import com.example.gameapp.model.Admin;
import com.example.gameapp.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/date/{date}")
    public List<Admin> getAdminsByDate(@PathVariable Date date) {
        return adminService.getAdminsByDate(date);
    }

    @PutMapping("/update-collection/{date}")
    public ResponseEntity<Admin> updateDailyCollection(@PathVariable Date date) {
        try {
            Admin updatedAdmin = adminService.updateDailyCollection(date);
            return ResponseEntity.ok(updatedAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/total-collection/{date}")
    public ResponseEntity<Double> getTotalCollectionForDate(@PathVariable Date date) {
        try {
            double totalCollection = adminService.getTotalCollectionForDate(date);
            return ResponseEntity.ok(totalCollection);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
