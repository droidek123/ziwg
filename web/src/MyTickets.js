import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './MyTickets.css';

function MyTickets() {
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
      // navigate('/');
    } catch (error) {
      if (error.response) {
        alert(`Niepoprawna nazwa użytkownika lub hasło`);
      } else {
        alert('Błąd połączenia z serwerem');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">nazwa aplikacji</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <nav className="navigation-bar">moje bilety</nav>

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

      {/* container to hold ticket containers */}
      <div className='tickets-container'>
        {/* TICKET */}
        <div className='ticket'>
          {/* image */}
          <div className='poster'></div>
          {/* other texts */}
          <div className='details'>
            <p><strong>Film Name</strong></p>
            <p><strong>Data: </strong></p>
            <p><strong>Godzina: </strong></p>
          </div>
        </div>
        <div className='ticket'>
          {/* image */}
          <div className='poster'></div>
          {/* other texts */}
          <div className='details'>
            <p><strong>Film Name</strong></p>
            <p><strong>Data: </strong></p>
            <p><strong>Godzina: </strong></p>
          </div>
        </div>
        <div className='ticket'>
          {/* image */}
          <div className='poster'></div>
          {/* other texts */}
          <div className='details'>
            <p><strong>Film Name</strong></p>
            <p><strong>Data: </strong></p>
            <p><strong>Godzina: </strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTickets;
