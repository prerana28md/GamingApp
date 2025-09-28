
import React from 'react';
import ApiTest from './ApiTest';
import './Dashboard.css';


const Dashboard = ({ stats, recentTransactions, members, games, loading, refreshDashboard }) => {


  const getMemberName = (transaction) => {
    if (transaction.memberName) return transaction.memberName;
    const member = members.find(m => m.id === transaction.memberId);
    return member ? member.name : transaction.memberId;
  };

  const getGameName = (transaction) => {
    if (transaction.gameName) return transaction.gameName;
    const game = games.find(g => g.id === transaction.gameId);
    return game ? game.name : transaction.gameId;
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
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <button 
            className="btn btn-sm btn-secondary"
            onClick={refreshDashboard}
            title="Refresh data"
          >
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
        <div className="recent-transactions">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <span className="member-name">Member: {getMemberName(transaction)}</span>
                  <span className="game-name">Game: {getGameName(transaction)}</span>
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
