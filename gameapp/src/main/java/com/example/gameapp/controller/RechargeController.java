package com.example.gameapp.controller;

import com.example.gameapp.model.Recharge;
import com.example.gameapp.service.RechargeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/recharges")
public class RechargeController {

    private final RechargeService rechargeService;

    public RechargeController(RechargeService rechargeService) {
        this.rechargeService = rechargeService;
    }

    @PostMapping
    public Recharge addRecharge(@RequestBody Recharge recharge) {
        try {
            return rechargeService.addRecharge(recharge);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add recharge", e);
        }
    }

    @GetMapping
    public List<Recharge> getAllRecharges() {
        return rechargeService.getAllRecharges();
    }

    @GetMapping("/member/{memberId}")
    public List<Recharge> getRechargesByMember(@PathVariable String memberId) {
        return rechargeService.getRechargesByMember(memberId);
    }
}
