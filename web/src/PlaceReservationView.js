import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PlaceReservationView.css';

function ReservationView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="reservation-page">
      <header className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">Cinema43</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>☰</button>
      </header>

      <nav className="navigation-bar">rezerwacja</nav>

      {sidebarOpen && (
        <>
          <div className="overlay" onClick={closeSidebar}></div>
          <div className="sidebar">
            <ul>
              <li><Link to="/login" onClick={closeSidebar}>Zaloguj się</Link></li>
              <li><Link to="/register" onClick={closeSidebar}>Zarejestruj się</Link></li>
              <li><Link to="/account" onClick={closeSidebar}>Moje konto</Link></li>
              <li><Link to="/" onClick={closeSidebar}>Wyloguj</Link></li>
            </ul>
          </div>
        </>
      )}

      <div className="reservation-content">
        <div className="movie-pr-poster" />
        <div className="reservation-info">
          <h2 className="movie-title">Tytuł filmu</h2>
          <div className="select-date">
            <p>wybierz dzień:</p>
            <button>dzisiaj</button>
            <button>jutro</button>
            <button>(data)</button>
            <button>(data)</button>
            <button>(data)</button>
            <button>(data)</button>
          </div>
          <div className="select-seats">
            <p>wybierz miejsca:</p>
            <div className="seating-view">widok sali</div>
            <div className="legend">legenda</div>
          </div>
          <div className="button-container">
            <button className="reserve-button">Zarezerwuj</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ReservationView;
