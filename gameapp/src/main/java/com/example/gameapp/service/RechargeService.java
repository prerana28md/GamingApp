package com.example.gameapp.service;

import com.example.gameapp.model.Member;
import com.example.gameapp.model.Recharge;
import com.example.gameapp.repository.MemberRepository;
import com.example.gameapp.repository.RechargeRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class RechargeService {

    private final RechargeRepository rechargeRepository;
    private final MemberRepository memberRepository;

    public RechargeService(RechargeRepository rechargeRepository, MemberRepository memberRepository) {
        this.rechargeRepository = rechargeRepository;
        this.memberRepository = memberRepository;
    }

    public Recharge addRecharge(Recharge recharge) throws Exception {
        Member member = memberRepository.findById(recharge.getMemberId())
                .orElseThrow(() -> new Exception("Member not found"));

        // Add recharge amount to member balance
        member.setBalance(member.getBalance() + recharge.getAmount());
        memberRepository.save(member);

        // Set date
        recharge.setDate(new Date());
        return rechargeRepository.save(recharge);
    }

    public List<Recharge> getAllRecharges() {
        return rechargeRepository.findAll();
    }

    public List<Recharge> getRechargesByMember(String memberId) {
        return rechargeRepository.findByMemberId(memberId);
    }
}
