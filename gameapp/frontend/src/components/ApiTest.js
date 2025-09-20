import React, { useState, useEffect } from 'react';
import { gamesAPI } from '../services/api';

const ApiTest = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Testing API connection...');
      const response = await gamesAPI.getAll();
      console.log('API Response:', response.data);
      setGames(response.data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>API Connection Test</h3>
      <button onClick={testConnection} disabled={loading}>
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {games.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <strong>Success!</strong> Found {games.length} games:
          <ul>
            {games.map(game => (
              <li key={game.id}>{game.name} - ₹{game.price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
