import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "./AuthContext"
import "./SnackView.css";

export default function SnackView() {
  const [quantities, setQuantities] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Błąd ładowania produktów:', err));
  }, []);

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

  const handleOrder = async () => {
    const selectedItems = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({
        productId: parseInt(productId),
        quantity,
      }));
  
    if (selectedItems.length === 0) {
      alert("Nie wybrano żadnych produktów.");
      return;
    }
  
    try {
      await axios.post("http://localhost:8081/snacks/order", {
        userId: userId || parseInt(localStorage.getItem("userId")),
        reservationId: 3, // hardcoded
        items: selectedItems
      });
  
      setShowSuccess(true);
    } catch (err) {
      console.error("Błąd zamówienia:", err);
      alert("Błąd podczas zamawiania.");
    }
  };;

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
        {products.map((product) => (
          <div key={product.id} className="snack-item">
            <div className="snack-image narrow" />
            <div className="snack-name">{product.name}</div>
            <div className="snack-price">{product.price.toFixed(2)}</div>
            <div className="snack-controls">
              <button onClick={() => increase(product.id)}>+</button>
              <span>{quantities[product.id] || 0}</span>
              <button onClick={() => decrease(product.id)}>-</button>
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
