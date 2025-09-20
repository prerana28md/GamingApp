package com.example.gameapp.service;

import com.example.gameapp.model.Member;
import com.example.gameapp.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member addMember(Member member) {
        return memberRepository.save(member);
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Member getMemberById(String id) throws Exception {
        return memberRepository.findById(id).orElseThrow(() -> new Exception("Member not found"));
    }

    public Member updateMember(String id, Member updatedMember) throws Exception {
        Member existingMember = getMemberById(id);
        existingMember.setName(updatedMember.getName());
        existingMember.setPhone(updatedMember.getPhone());
        existingMember.setBalance(updatedMember.getBalance());
        return memberRepository.save(existingMember);
    }

    public void deleteMember(String id) {
        memberRepository.deleteById(id);
    }
}
