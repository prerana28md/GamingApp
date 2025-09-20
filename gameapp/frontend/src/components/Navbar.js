import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/games', label: 'Games', icon: 'fas fa-gamepad' },
    { path: '/members', label: 'Members', icon: 'fas fa-users' },
    { path: '/transactions', label: 'Transactions', icon: 'fas fa-exchange-alt' },
    { path: '/recharges', label: 'Recharges', icon: 'fas fa-credit-card' },
    { path: '/admins', label: 'Admins', icon: 'fas fa-user-shield' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <i className="fas fa-gamepad"></i>
        <span>Game App</span>
      </div>
      <ul className="navbar-nav">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
