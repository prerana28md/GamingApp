package com.example.gameapp.service;

import com.example.gameapp.model.Admin;
import java.util.Date;
import java.util.List;

public interface AdminService {
    Admin addAdmin(Admin admin);
    List<Admin> getAllAdmins();
    List<Admin> getAdminsByDate(Date date);
    Admin updateDailyCollection(Date date);
    double getTotalCollectionForDate(Date date);
}
