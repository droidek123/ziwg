import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSubmit = async (event) => {
    console.log("wysyłam")
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Hasła się nie zgadzają!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/user/user/new', {
        email,
        username,
        password
      });

      alert('Rejestracja zakończona sukcesem!');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        alert(`Błąd: ${error.response.data.message || error.response.status}`);
      } else {
        alert('Błąd połączenia z serwerem');
      }
    }
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
  
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="username">Nazwa użytkownika</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Hasło</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Powtórz hasło</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Zarejestruj</button>
      </form>

      <div className="bottom-login-link">
        masz już konto?{' '}
        <Link to="/login" className="bold-link">
          Zaloguj się
        </Link>
      </div>
    </div>
  );
}

export default Register;
