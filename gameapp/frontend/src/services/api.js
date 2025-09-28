import axios from 'axios';

const API_BASE_URL = 'http://localhost:9001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response received from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running on port 9001');
    }
    return Promise.reject(error);
  }
);

// Games API
export const gamesAPI = {
  getAll: () => api.get('/games'),
  getById: (id) => api.get(`/games/${id}`),
  create: (game) => api.post('/games', game),
  update: (id, game) => api.put(`/games/${id}`, game),
  delete: (id) => api.delete(`/games/${id}`),
};

// Members API
export const membersAPI = {
  getAll: () => api.get('/members'),
  getById: (id) => api.get(`/members/${id}`),
  create: (member) => api.post('/members', member),
  update: (id, member) => api.put(`/members/${id}`, member),
  delete: (id) => api.delete(`/members/${id}`),
};

// Transactions API
export const transactionsAPI = {
  getAll: () => api.get('/transactions'),
  getByMember: (memberId) => api.get(`/transactions/member/${memberId}`),
  getByGame: (gameId) => api.get(`/transactions/game/${gameId}`),
  create: (transaction) => api.post('/transactions', transaction),
};

// Recharges API
export const rechargesAPI = {
  getAll: () => api.get('/recharges'),
  getByMember: (memberId) => api.get(`/recharges/member/${memberId}`),
  create: (recharge) => api.post('/recharges', recharge),
};

// Admins API
export const adminsAPI = {
  getAll: () => api.get('/admins'),
  getByDate: (date) => api.get(`/admins/date/${date}`),
  create: (admin) => api.post('/admins', admin),
};

export default api;
