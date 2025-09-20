package com.example.gameapp.controller;

import com.example.gameapp.model.Member;
import com.example.gameapp.service.MemberService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public Member addMember(@RequestBody Member member) {
        return memberService.addMember(member);
    }

    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable String id) {
        try {
            return memberService.getMemberById(id);
        } catch (Exception e) {
            throw new RuntimeException("Member not found", e);
        }
    }

    @PutMapping("/{id}")
    public Member updateMember(@PathVariable String id, @RequestBody Member member) {
        try {
            return memberService.updateMember(id, member);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update member", e);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteMember(@PathVariable String id) {
        memberService.deleteMember(id);
    }
}
