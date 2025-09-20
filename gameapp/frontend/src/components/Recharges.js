import React, { useState, useEffect } from 'react';
import { rechargesAPI, membersAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Recharges.css';

const Recharges = () => {
  const [recharges, setRecharges] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rechargesRes, membersRes] = await Promise.all([
        rechargesAPI.getAll(),
        membersAPI.getAll(),
      ]);

      setRecharges(rechargesRes.data);
      setMembers(membersRes.data);
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
      const rechargeData = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      await rechargesAPI.create(rechargeData);
      toast.success('Recharge created successfully');
      setShowForm(false);
      setFormData({
        memberId: '',
        amount: '',
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to create recharge');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setFormData({
      memberId: '',
      amount: '',
    });
  };

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : memberId;
  };

  if (loading) {
    return <div className="loading">Loading recharges...</div>;
  }

  return (
    <div className="recharges">
      <div className="recharges-header">
        <h1>Recharges Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus"></i> New Recharge
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-content">
            <div className="form-header">
              <h2>Create New Recharge</h2>
              <button className="close-btn" onClick={resetForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="recharge-form">
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
                      {member.name} (Current Balance: ₹{member.balance.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="0.01"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Recharge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="recharges-table">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recharges.map((recharge) => (
              <tr key={recharge.id}>
                <td>{getMemberName(recharge.memberId)}</td>
                <td className="amount">₹{recharge.amount.toFixed(2)}</td>
                <td>{new Date(recharge.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {recharges.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-credit-card"></i>
          <h3>No recharges found</h3>
          <p>Create your first recharge to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Recharges;
