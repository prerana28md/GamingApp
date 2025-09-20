package com.example.gameapp.repository;

import com.example.gameapp.model.Recharge;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RechargeRepository extends MongoRepository<Recharge, String> {
    // Find all recharges of a member
    List<Recharge> findByMemberId(String memberId);
}
