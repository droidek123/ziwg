import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Login.css';

function Login() {
  const { login } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8084/auth/login', {
        username,
        password
      });
  
      const token = response.data;
  
      // Zapisz token do localStorage
      localStorage.setItem('jwtToken', token);
  
      // Dekoduj token i wyciągnij userId
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
  
      login(userId);
      navigate('/'); // możesz przekazać userId też przez context
  
    } catch (error) {
      if (error.response) {
        alert(`Niepoprawna Nazwa użytkownika lub Hasło`);
      } else {
        alert('Błąd połączenia z serwerem');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">Cinema43</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <nav className="navigation-bar">Logowanie</nav>

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

      <form className="login-form" onSubmit={handleSubmit}>
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

        <button type="submit">Zaloguj</button>
      </form>

      <div className="bottom-login-link">
        Nie masz konta?{' '}
        <Link to="/Register" className="bold-link">
          Zarejestruj się
        </Link>
      </div>
    </div>
  );
}

export default Login;
