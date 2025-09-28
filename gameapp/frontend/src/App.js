import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import Navbar from './components/Navbar';

import Dashboard from './components/Dashboard';
import Games from './components/Games';
import Members from './components/Members';
import Transactions from './components/Transactions';
import Recharges from './components/Recharges';
import Admins from './components/Admins';
import { useState, useCallback, useEffect } from 'react';
import { gamesAPI, membersAPI, transactionsAPI, rechargesAPI } from './services/api';


function App() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalGames: 0,
      totalMembers: 0,
      totalTransactions: 0,
      totalRecharges: 0,
    },
    recentTransactions: [],
    members: [],
    games: [],
    loading: true,
  });

  const fetchDashboardData = useCallback(async () => {
    setDashboardData(prev => ({ ...prev, loading: true }));
    try {
      const [gamesRes, membersRes, transactionsRes, rechargesRes] = await Promise.all([
        gamesAPI.getAll(),
        membersAPI.getAll(),
        transactionsAPI.getAll(),
        rechargesAPI.getAll(),
      ]);
      setDashboardData({
        stats: {
          totalGames: gamesRes.data.length,
          totalMembers: membersRes.data.length,
          totalTransactions: transactionsRes.data.length,
          totalRecharges: rechargesRes.data.length,
        },
        recentTransactions: transactionsRes.data.slice().reverse().slice(0, 5),
        members: membersRes.data,
        games: gamesRes.data,
        loading: false,
      });
    } catch (error) {
      setDashboardData(prev => ({ ...prev, loading: false }));
      // Optionally handle error
    }
  }, []);

  // Fetch dashboard data on initial mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard {...dashboardData} refreshDashboard={fetchDashboardData} />} />
            <Route path="/games" element={<Games />} />
            <Route path="/members" element={<Members />} />
            <Route path="/transactions" element={<Transactions refreshDashboard={fetchDashboardData} />} />
            <Route path="/recharges" element={<Recharges />} />
            <Route path="/admins" element={<Admins />} />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
