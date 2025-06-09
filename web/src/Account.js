import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Account.css';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const userId = 5; // na sztywno — docelowo pobieraj z auth/localStorage/cookies

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/user/user/${userId}`, {
          params: { userId } // albo bez tego, jeśli Spring nie potrzebuje dwóch
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych użytkownika:', error);
      }
    };

    fetchUserData();
  }, [userId]);

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

      <nav className="navigation-bar">Moje konto</nav>

      <div className="account-header">
        <h2>Witaj</h2>
      </div>

      <div className="account-settings-container">
        <h3 className="section-title">Ustawienia konta</h3>

        <div className="account-tile">
          <div className="tile-item">Email:</div>
          <div className="tile-item">Login:</div>
          <div className="tile-item">Hasło:</div>
        </div>



      </div>
    </div>
  );
};

export default Account;