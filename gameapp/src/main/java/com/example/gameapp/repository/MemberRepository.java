package com.example.gameapp.repository;

import com.example.gameapp.model.Member;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends MongoRepository<Member, String> {
    // Optional: custom query methods
     List<Member> findByName(String name);
}
