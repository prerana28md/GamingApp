import React, { useState, useEffect } from 'react';
import { adminsAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Admins.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await adminsAPI.getAll();
      setAdmins(response.data);
    } catch (error) {
      toast.error('Failed to fetch admin records');
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
      const adminData = {
        amount: parseFloat(formData.amount),
      };

      await adminsAPI.create(adminData);
      toast.success('Admin record created successfully');
      setShowForm(false);
      setFormData({
        amount: '',
      });
      fetchAdmins();
    } catch (error) {
      toast.error('Failed to create admin record');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setFormData({
      amount: '',
    });
  };

  if (loading) {
    return <div className="loading">Loading admin records...</div>;
  }

  return (
    <div className="admins">
      <div className="admins-header">
        <h1>Admin Records Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus"></i> Add Record
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-content">
            <div className="form-header">
              <h2>Add New Admin Record</h2>
              <button className="close-btn" onClick={resetForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form">
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
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admins-table">
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="amount">₹{admin.amount.toFixed(2)}</td>
                <td>{new Date(admin.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {admins.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-user-shield"></i>
          <h3>No admin records found</h3>
          <p>Add your first admin record to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Admins;
