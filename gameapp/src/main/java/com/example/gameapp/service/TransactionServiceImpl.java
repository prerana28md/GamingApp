package com.example.gameapp.service;

import com.example.gameapp.model.Member;
import com.example.gameapp.model.Game;
import com.example.gameapp.model.Transaction;
import com.example.gameapp.repository.MemberRepository;
import com.example.gameapp.repository.GameRepository;
import com.example.gameapp.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final MemberRepository memberRepository;
    private final GameRepository gameRepository;
    private final AdminService adminService;

    public TransactionServiceImpl(TransactionRepository transactionRepository, 
                                  MemberRepository memberRepository,
                                  GameRepository gameRepository,
                                  AdminService adminService) {
        this.transactionRepository = transactionRepository;
        this.memberRepository = memberRepository;
        this.gameRepository = gameRepository;
        this.adminService = adminService;
    }

    @Override
    public Transaction addTransaction(Transaction transaction) throws Exception {
        Member member = memberRepository.findById(transaction.getMemberId())
                .orElseThrow(() -> new Exception("Member not found"));
        Game game = gameRepository.findById(transaction.getGameId())
                .orElseThrow(() -> new Exception("Game not found"));

        if (member.getBalance() < game.getPrice()) {
            throw new Exception("Insufficient balance");
        }

        member.setBalance(member.getBalance() - game.getPrice());
        memberRepository.save(member);

        transaction.setAmount(game.getPrice());
        transaction.setDate(new Date());
        transaction.setMemberName(member.getName());
        transaction.setGameName(game.getName());

        Transaction savedTransaction = transactionRepository.save(transaction);
        
        // Automatically update admin collection for today
        adminService.updateDailyCollection(new Date());
        
        return savedTransaction;
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public List<Transaction> getTransactionsByMember(String memberId) {
        return transactionRepository.findByMemberId(memberId);
    }

    @Override
    public List<Transaction> getTransactionsByGame(String gameId) {
        return transactionRepository.findByGameId(gameId);
    }
}
