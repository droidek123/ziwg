import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Account.css';
import {AuthContext} from './AuthContext';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { userId } = useContext(AuthContext);
  userId: userId || parseInt(localStorage.getItem("userId"));

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
          <Link to="/" className="app-link">Cinema43</Link>
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
          <h2>Witaj, {userData?.firstName || userData?.email}!</h2>
        </div>

        <div className="account-settings-container">
          <h3 className="section-title">Ustawienia konta</h3>

          <div className="account-tile">
            <div className="tile-item">Email: {userData?.email}</div>
            <div className="tile-item">Imię: {userData?.firstName}</div>
            <div className="tile-item">Imię: {userData?.lastName}</div>
            <div className="tile-item">
              Login: {userData?.username || userData?.name || '—'}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Account;