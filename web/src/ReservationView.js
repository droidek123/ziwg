import React, { useState, useEffect, useRef } from "react";
import "./ReservationView.css";
import { useNavigate, Link } from "react-router-dom";

export default function ReservationView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleCancel = (confirm) => {
    setShowModal(false);
    navigate("/reservation");
  };

  const closeSidebar = () => setMenuOpen(false);

  const filmId = "123"; // Przykładowy identyfikator filmu

  return (
    <div className="reservation-container">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" onClick={closeSidebar} style={{ textDecoration: 'none', color: 'black' }}>
            nazwa aplikacji
          </Link>
        </h1>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="menu-overlay" onClick={closeSidebar}></div>
          <div className="sidebar" ref={menuRef}>
            <ul>
              <li><Link to="/login" onClick={closeSidebar}>zaloguj się</Link></li>
              <li><Link to="/register" onClick={closeSidebar}>zarejestruj się</Link></li>
              <li><Link to="/account" onClick={closeSidebar}>moje konto</Link></li>
              <li><Link to="/" onClick={closeSidebar}>wyloguj</Link></li>
            </ul>
          </div>
        </>
      )}

      <div className="navigation-bar">zarządzanie rezerwacją</div>

      <div className="main-content">
        {/* Plakat filmu */}
        <div className="movie-poster" />

        <div className="reservation-details">
          <h2 className="movie-title">
            <Link to={`/film/${filmId}`} style={{ textDecoration: 'none', color: 'black' }}>
              Tytuł filmu
            </Link>
          </h2>
          <p className="info-text">data, godzina</p>
          <p className="info-text">sala</p>
          <p className="info-text">miejsca</p>
        </div>

        <div className="action-buttons">
          <button className="action-button" onClick={() => setShowModal(true)}>
            Odwołaj rezerwację
          </button>
          <button className="action-button">Potwierdzenie rezerwacji</button>
        </div>
      </div>

      <div className="snack-order">
        <button className="snack-button" onClick={() => navigate('/snacks')}>
          Zamów przekąski
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-text">
              Czy jesteś pewien, że chcesz odwołać rezerwację?
            </p>
            <div className="modal-buttons">
              <button className="modal-btn confirm" onClick={() => handleCancel(true)}>Tak</button>
              <button className="modal-btn cancel" onClick={() => handleCancel(false)}>Nie</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
