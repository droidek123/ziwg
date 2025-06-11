import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="logout-page">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">Cinema43</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <nav className="navigation-bar">wylogowano</nav>

      {sidebarOpen && (
        <>
          <div className="overlay" onClick={closeSidebar}></div>
          <div className="sidebar">
            <ul>
              <li><Link to="/login" onClick={closeSidebar}>Zaloguj się</Link></li>
              <li><Link to="/register" onClick={closeSidebar}>Zarejestruj się</Link></li>
              <li><Link to="/account" onClick={closeSidebar}>Moje konto</Link></li>
              <li><Link to="/" onClick={closeSidebar}>strona główna</Link></li>
            </ul>
          </div>
        </>
      )}

      <div className="logout-message">
        <h2>Wylogowano pomyślnie</h2>
        <p>Do zobaczenia!</p>
        <Link to="/login" className="home-button">Zaloguj się ponownie</Link>
      </div>
    </div>
  );
};

export default Logout;
