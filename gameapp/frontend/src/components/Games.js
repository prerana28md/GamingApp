import React, { useState, useEffect } from 'react';
import { gamesAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Games.css';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    minPlayerCount: '',
    maxPlayerCount: '',
    playerCountMultiple: '',
    duration: '',
    status: 'active',
  });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await gamesAPI.getAll();
      setGames(response.data);
    } catch (error) {
      toast.error('Failed to fetch games');
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
      const gameData = {
        ...formData,
        price: parseFloat(formData.price),
        minPlayerCount: parseInt(formData.minPlayerCount),
        maxPlayerCount: parseInt(formData.maxPlayerCount),
        playerCountMultiple: parseInt(formData.playerCountMultiple),
        duration: parseInt(formData.duration),
      };

      if (editingGame) {
        const response = await gamesAPI.update(editingGame.id, gameData);
        if (response.status === 200) {
          toast.success('Game updated successfully');
        } else {
          toast.error('Failed to update game');
          return;
        }
      } else {
        await gamesAPI.create(gameData);
        toast.success('Game created successfully');
      }

      setShowForm(false);
      setEditingGame(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        minPlayerCount: '',
        maxPlayerCount: '',
        playerCountMultiple: '',
        duration: '',
        status: 'active',
      });
      fetchGames();
    } catch (error) {
      console.error('Error saving game:', error);
      if (error.response?.status === 404) {
        toast.error('Game not found. Please refresh and try again.');
      } else {
        toast.error('Failed to save game');
      }
    }
  };

  const handleEdit = (game) => {
    setEditingGame(game);
    setFormData({
      name: game.name,
      price: game.price.toString(),
      description: game.description,
      minPlayerCount: game.minPlayerCount.toString(),
      maxPlayerCount: game.maxPlayerCount.toString(),
      playerCountMultiple: game.playerCountMultiple.toString(),
      duration: game.duration.toString(),
      status: game.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await gamesAPI.delete(id);
        toast.success('Game deleted successfully');
        fetchGames();
      } catch (error) {
        toast.error('Failed to delete game');
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingGame(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      minPlayerCount: '',
      maxPlayerCount: '',
      playerCountMultiple: '',
      duration: '',
      status: 'active',
    });
  };

  if (loading) {
    return <div className="loading">Loading games...</div>;
  }

  return (
    <div className="games">
      <div className="games-header">
        <h1>Games Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus"></i> Add Game
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-content">
            <div className="form-header">
              <h2>{editingGame ? 'Edit Game' : 'Add New Game'}</h2>
              <button className="close-btn" onClick={resetForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="game-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Game Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Min Players</label>
                  <input
                    type="number"
                    name="minPlayerCount"
                    value={formData.minPlayerCount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Max Players</label>
                  <input
                    type="number"
                    name="maxPlayerCount"
                    value={formData.maxPlayerCount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Player Multiple</label>
                  <input
                    type="number"
                    name="playerCountMultiple"
                    value={formData.playerCountMultiple}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingGame ? 'Update Game' : 'Add Game'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-header">
              <h3>{game.name}</h3>
              <span className={`status ${game.status}`}>{game.status}</span>
            </div>
            <div className="game-details">
              <p className="price">₹{game.price}</p>
              <p className="description">{game.description}</p>
              <div className="game-info">
                <span><i className="fas fa-users"></i> {game.minPlayerCount}-{game.maxPlayerCount} players</span>
                <span><i className="fas fa-clock"></i> {game.duration} min</span>
              </div>
            </div>
            <div className="game-actions">
              <button 
                className="btn btn-sm btn-primary"
                onClick={() => handleEdit(game)}
              >
                <i className="fas fa-edit"></i> Edit
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(game.id)}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {games.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-gamepad"></i>
          <h3>No games found</h3>
          <p>Add your first game to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Games;
