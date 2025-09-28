import React, { useState, useEffect } from 'react';
import { membersAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Members.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    balance: '',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      toast.error('Failed to fetch members');
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
      const memberData = {
        ...formData,
        balance: parseFloat(formData.balance) || 0,
      };

      if (editingMember) {
        const response = await membersAPI.update(editingMember.id, memberData);
        if (response.status === 200) {
          toast.success('Member updated successfully');
        } else {
          toast.error('Failed to update member');
          return;
        }
      } else {
        await membersAPI.create(memberData);
        toast.success('Member created successfully');
      }

      setShowForm(false);
      setEditingMember(null);
      setFormData({
        name: '',
        phone: '',
        balance: '',
      });
      fetchMembers();
    } catch (error) {
      console.error('Error saving member:', error);
      if (error.response?.status === 404) {
        toast.error('Member not found. Please refresh and try again.');
      } else {
        toast.error('Failed to save member');
      }
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      phone: member.phone,
      balance: member.balance.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await membersAPI.delete(id);
        toast.success('Member deleted successfully');
        fetchMembers();
      } catch (error) {
        toast.error('Failed to delete member');
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData({
      name: '',
      phone: '',
      balance: '',
    });
  };

  if (loading) {
    return <div className="loading">Loading members...</div>;
  }

  return (
    <div className="members">
      <div className="members-header">
        <h1>Members Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus"></i> Add Member
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-content">
            <div className="form-header">
              <h2>{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
              <button className="close-btn" onClick={resetForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="member-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Initial Balance (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  name="balance"
                  value={formData.balance}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="members-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td className="balance">₹{member.balance.toFixed(2)}</td>
                <td className="actions">
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(member)}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(member.id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {members.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-users"></i>
          <h3>No members found</h3>
          <p>Add your first member to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Members;
