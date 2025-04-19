import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const userName = "User Name"; // tymczasowo na sztywno
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="account-page">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">nazwa aplikacji</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {showSidebar && (
        <>
          <div className="sidebar">
            <ul>
              <li><Link to="/">Strona główna</Link></li>
              <li><Link to="/account">Moje konto</Link></li>
              <li><Link to="/reservation">Rezerwacje</Link></li>
              <li><Link to="/logout">Wyloguj</Link></li>
            </ul>
          </div>
          <div className="overlay" onClick={toggleSidebar}></div>
        </>
      )}

      <nav className="navigation-bar">
        Moje konto
      </nav>

      <div className="account-header">
        <h2>Witaj, {userName}!</h2>
      </div>

      <div className="account-settings-container">
        <h3 className="section-title">Ustawienia konta</h3>

        <div className="account-tile">
          <div className="tile-item">📧 Email: user@example.com</div>
          <div className="tile-item">👤 Login: user.nickname</div>
          <div className="tile-item">🔒 Hasło: ********</div>
        </div>

        <div className="reservation-button-wrapper">
          <Link to="/reservation" className="reservation-button">
            Zarządzaj rezerwacjami
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
