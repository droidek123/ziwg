import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CinemaHall.css';

const CinemaHall = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const rows = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  const cols = 14;

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  return (
    <div className="cinema-page">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">nazwa aplikacji</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>☰</button>
      </div>

      <nav className="navigation-bar">Widok sali kinowej</nav>

      {sidebarOpen && (
        <>
          <div className="overlay" onClick={closeSidebar}></div>
          <div className="sidebar">
            <ul>
              <li><Link to="/login" onClick={closeSidebar}>zaloguj się</Link></li>
              <li><Link to="/register" onClick={closeSidebar}>zarejestruj się</Link></li>
              <li><Link to="/account" onClick={closeSidebar}>moje konto</Link></li>
              <li><Link to="/" onClick={closeSidebar}>strona główna</Link></li>
            </ul>
          </div>
        </>
      )}

      <div className="screen">EKRAN</div>

      <div className="seating">
        {rows.map((row, rowIndex) => (
          <div key={row} className="row">
            {Array.from({ length: cols }, (_, colIndex) => {
              const seatId = `${row}${colIndex + 1}`;
              const selected = selectedSeats.includes(seatId);
              return (
                <div
                  key={seatId}
                  className={`seat ${selected ? 'selected' : ''}`}
                  onClick={() => toggleSeat(seatId)}
                >
                  {colIndex + 1}
                </div>
              );
            })}
            <div className="row-label">{row}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaHall;
