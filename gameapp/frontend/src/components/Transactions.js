import React, { useState, useEffect } from 'react';
import { transactionsAPI, membersAPI, gamesAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [members, setMembers] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    gameId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transactionsRes, membersRes, gamesRes] = await Promise.all([
        transactionsAPI.getAll(),
        membersAPI.getAll(),
        gamesAPI.getAll(),
      ]);

      setTransactions(transactionsRes.data);
      setMembers(membersRes.data);
      setGames(gamesRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await transactionsAPI.create(formData);
      toast.success('Transaction created successfully');
      setShowForm(false);
      setFormData({
        memberId: '',
        gameId: '',
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to create transaction');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setFormData({
      memberId: '',
      gameId: '',
    });
  };

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : memberId;
  };

  const getGameName = (gameId) => {
    const game = games.find(g => g.id === gameId);
    return game ? game.name : gameId;
  };

  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h1>Transactions Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus"></i> New Transaction
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-content">
            <div className="form-header">
              <h2>Create New Transaction</h2>
              <button className="close-btn" onClick={resetForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="transaction-form">
              <div className="form-group">
                <label>Member</label>
                <select
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} (Balance: ₹{member.balance.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Game</label>
                <select
                  name="gameId"
                  value={formData.gameId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a game</option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name} (₹{game.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Game</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{getMemberName(transaction.memberId)}</td>
                <td>{getGameName(transaction.gameId)}</td>
                <td className="amount">₹{transaction.amount.toFixed(2)}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-exchange-alt"></i>
          <h3>No transactions found</h3>
          <p>Create your first transaction to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
