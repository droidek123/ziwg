import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SnackView.css";

const snacksList = [
  { id: 1, name: "Popcorn mały", price: 15.99 },
  { id: 2, name: "Popcorn średni", price: 16.99 },
  { id: 3, name: "Popcorn duży", price: 18.99 },
  { id: 4, name: "Cola mała", price: 11.99 },
  { id: 5, name: "Cola duża", price: 13.99 },
  { id: 6, name: "Fanta mała", price: 11.99 },
  { id: 7, name: "Fanta duża", price: 13.99 },
  { id: 8, name: "Nachosy małe", price: 15.99 },
  { id: 9, name: "Nachosy duże", price: 18.99 },
  { id: 10, name: "Haribo", price: 9.99 },
  { id: 11, name: "Woda 500ml", price: 9.99 },
  { id: 12, name: "Pepsi puszka", price: 9.99 },
  { id: 13, name: "Mirinda puszka", price: 9.99 },
  { id: 14, name: "Herbata 200ml", price: 9.99 },
  { id: 15, name: "Popcorn czekoladowy - dopłata", price: 2.99 },
  { id: 16, name: "Popcorn karmelowy - dopłata", price: 1.99 },
];

export default function SnackView() {
  const [quantities, setQuantities] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const increase = (id) => {
    setQuantities({ ...quantities, [id]: (quantities[id] || 0) + 1 });
  };

  const decrease = (id) => {
    if (quantities[id] > 0) {
      setQuantities({ ...quantities, [id]: quantities[id] - 1 });
    }
  };

  const closeSidebar = () => setMenuOpen(false);

  const handleOrder = () => {
    setShowSuccess(true);
  };

  const handleOk = () => {
    navigate("/reservation");
  };

  return (
    <div className="snackview-container">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" onClick={closeSidebar} style={{ textDecoration: "none", color: "black" }}>
            nazwa aplikacji
          </Link>
        </h1>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>&#9776;</button>
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

      <div className="navigation-bar">zamawianie przekąsek</div>

      <div className="snack-grid">
        {snacksList.map((snack) => (
          <div key={snack.id} className="snack-item">
            <div className="snack-image narrow" />
            <div className="snack-name">{snack.name}</div>
            <div className="snack-price">{snack.price.toFixed(2)}</div>
            <div className="snack-controls">
              <button onClick={() => increase(snack.id)}>+</button>
              <span>{quantities[snack.id] || 0}</span>
              <button onClick={() => decrease(snack.id)}>-</button>
            </div>
          </div>
        ))}
      </div>

      <div className="snack-submit">
        <button className="snack-button" onClick={handleOrder}>Zamów</button>
      </div>

      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-text">Zamówienie przebiegło pomyślnie!</p>
            <button className="modal-btn confirm" onClick={handleOk}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
}
