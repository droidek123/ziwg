import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const getDates = () => {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit' };
    const labels = ['dzisiaj', 'jutro'];

    const result = [];

    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const label = labels[i] || date.toLocaleDateString('pl-PL', { weekday: 'long' });
      result.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        date: date.toLocaleDateString('pl-PL', options),
      });
    }

    return result;
  };

  const dates = getDates();

  return (
    <div className="home-page">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">nazwa aplikacji</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <nav className="navigation-bar">Repertuar</nav>

      {/* Nowy pasek z dniami */}
      <div className="day-selector">
        {dates.map((day, index) => (
          <button
            key={index}
            className={`day-button ${selectedDayIndex === index ? 'selected' : ''}`}
            onClick={() => setSelectedDayIndex(index)}
          >
            {day.label}<br />
            <span className="date">{day.date}</span>
          </button>
        ))}
      </div>

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

      <div className="home-content">
        <h2>Witaj w aplikacji!</h2>
        <p>Tutaj możesz zacząć rezerwację lub zamówić przekąski.</p>
        <div className="home-buttons">
          <Link to="/reservation" className="home-button">Zarezerwuj</Link>
          <Link to="/ordersnacks" className="home-button">Zamów przekąski</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
