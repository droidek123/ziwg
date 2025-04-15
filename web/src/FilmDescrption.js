import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FilmDescription.css';

function MovieDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="movie-page">
      <header className="header">
        <h1 className="app-title">
          <Link to="/" className="app-link">nazwa aplikacji</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>☰</button>
      </header>

      <nav className="navigation-bar">(tytuł filmu)</nav>

      {sidebarOpen && (
        <>
          <div className="overlay" onClick={closeSidebar}></div>
          <div className="sidebar">
            <ul>
              <li><Link to="/login" onClick={closeSidebar}>zaloguj się</Link></li>
              <li><Link to="/register" onClick={closeSidebar}>zarejestruj się</Link></li>
              <li><Link to="/account" onClick={closeSidebar}>moje konto</Link></li>
              <li><Link to="/" onClick={closeSidebar}>wyloguj</Link></li>
            </ul>
          </div>
        </>
      )}

      <div className="movie-content">
        <div className="movie-poster" />
            <div className='movie-texts'>
                <h2 className="movie-title">Tytuł filmu</h2>
                <div className="movie-description">
                <p className="movie-text">opis filmu</p>
            </div>
        </div>
      </div>

      <div className="button-container">
        <button className="reserve-button">Zarezerwuj</button>
      </div>
    </div>
  );
}

export default MovieDetail;
