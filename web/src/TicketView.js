import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TicketView.css';

function TicketView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const ticket = {
    movieTitle: 'Film Name',
    screeningDate: '2025-04-25',
    screeningTime: '19:30',
    cinemaName: 'Cool Cinema Name',
    address: 'Address',
    seat: 'Rząd N, Miesjce n',
    bookingCode: 'ABC123456',
  };

  return (
    <div className="movie-page">
      <header className="header">
        <h1 className="app-title">
          <Link to="/" className="app-link">nazwa aplikacji</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>☰</button>
      </header>

      <nav className="navigation-bar">Twój bilet</nav>

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

      <div className="ticket-content">
        <div className="ticket-poster">
            {/* image supposed to go there. */}        
        </div>
        
        <div className="ticket-texts">
          {/* Here can be a cinema logo, if we don't need it, it can be deleted. The example Logo 
          lays in a public folder */}        
          {/* <img src="TicketViewExampleLogo.png" alt="Cinema Logo" className="cinema-logo" /> */}

          <h2 className="ticket-movie-title">{ticket.movieTitle}</h2>

          <div className="ticket-description">
            <p><strong>Description: </strong>description of the film from its description, same as in FilmDescription</p>
            <hr></hr>
            <p><strong>Data: </strong> {ticket.screeningDate}</p>
            <p><strong>Godzina: </strong> {ticket.screeningTime}</p>
            <p><strong>Kino: </strong> {ticket.cinemaName}</p>
            <p><strong>Adres: </strong> {ticket.address}</p>
            <p><strong>Miejsce: </strong> {ticket.seat}</p>
            <p><strong>Kod rezerwacji: </strong> {ticket.bookingCode}</p>
            {/* remove if no QR needed        
            <div className="ticket-qr">
              QR goes here        
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketView;
