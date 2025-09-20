package com.example.gameapp.repository;

import com.example.gameapp.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    // Find admin records by date
    List<Admin> findByDate(Date date);
}
