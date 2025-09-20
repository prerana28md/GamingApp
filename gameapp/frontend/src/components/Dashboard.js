import React, { useState, useEffect } from 'react';
import { gamesAPI, membersAPI, transactionsAPI, rechargesAPI } from '../services/api';
import ApiTest from './ApiTest';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalGames: 0,
    totalMembers: 0,
    totalTransactions: 0,
    totalRecharges: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [gamesRes, membersRes, transactionsRes, rechargesRes] = await Promise.all([
        gamesAPI.getAll(),
        membersAPI.getAll(),
        transactionsAPI.getAll(),
        rechargesAPI.getAll(),
      ]);

      setStats({
        totalGames: gamesRes.data.length,
        totalMembers: membersRes.data.length,
        totalTransactions: transactionsRes.data.length,
        totalRecharges: rechargesRes.data.length,
      });

      setRecentTransactions(transactionsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <ApiTest />
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-gamepad"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalGames}</h3>
            <p>Total Games</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalMembers}</h3>
            <p>Total Members</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalTransactions}</h3>
            <p>Total Transactions</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-credit-card"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalRecharges}</h3>
            <p>Total Recharges</p>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Transactions</h2>
        <div className="recent-transactions">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <span className="member-id">Member: {transaction.memberId}</span>
                  <span className="game-id">Game: {transaction.gameId}</span>
                </div>
                <div className="transaction-amount">
                  ₹{transaction.amount}
                </div>
                <div className="transaction-date">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <p>No recent transactions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
