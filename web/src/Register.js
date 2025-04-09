import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    navigate('/'); 
  };

  return (
    <div className="register-page">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">nazwa aplikacji</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <nav className="navigation-bar">rejestracja</nav>

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

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">nazwa użytkownika</label>
        <input type="text" id="username" required />

        <label htmlFor="password">hasło</label>
        <input type="password" id="password" required />

        <label htmlFor="confirmPassword">powtórz hasło</label>
        <input type="password" id="confirmPassword" required />

        <button type="submit">Zarejestruj</button>
      </form>

      <div className="bottom-login-link">
        masz już konto?{' '}
        <Link to="/login" className="bold-link">
          zaloguj się
        </Link>
      </div>
    </div>
  );
}

export default Register;
