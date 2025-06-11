import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [shows, setShows] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const getDates = () => {
    const today = new Date();
    const shortFormat = { day: '2-digit', month: '2-digit' };
    const labels = ['dzisiaj', 'jutro'];

    const result = [];

    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const label = labels[i] || date.toLocaleDateString('pl-PL', { weekday: 'long' });
      result.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        date: date.toLocaleDateString('pl-PL', shortFormat),
        keyDate: date.toISOString().split('T')[0],
      });
    }
    return result;
  };

  const dates = getDates();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const selectedDate = new Date(dates[selectedDayIndex].keyDate);
        const formattedDateTime = selectedDate.toISOString().slice(0, 19);
        console.log("Wysyłana data (LocalDateTime):", formattedDateTime);
        const response = await axios.get('http://localhost:8081/show/shows', {
          params: { showDate: formattedDateTime }
        });
        setShows(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania pokazów filmowych:', error);
      }
    };

    fetchShows();
  }, [selectedDayIndex]);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="home-page">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">Cinema43</Link>
        </h1>



        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

     <nav className="navigation-bar">
       Repertuar


     </nav>



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

      <div className="movie-grid-container">
        {shows.length > 0 ? (
          shows.map((show, index) => (
            <div key={show.id || index} className="movie-tile">
              <div className="movie-box"></div>
              <div className="movie-title">{show.title}</div>
              <div className="show-time">⏰ {show.showTime}</div>
              <button className="reserve-button">Zarezerwuj</button>
            </div>
          ))
        ) : (
          <div className="no-shows">Brak pokazów dla wybranego dnia.</div>
        )}
      </div>

      {sidebarOpen && (
        <>
          <div className="overlay" onClick={closeSidebar}></div>
          <div className="sidebar">
            <ul>
              <li><Link to="/" onClick={closeSidebar}>Strona główna</Link></li>
              <li><Link to="/register" onClick={closeSidebar}>Zarejestruj się</Link></li>
              <li><Link to="/login" onClick={closeSidebar}>Zaloguj się</Link></li>
              <li><Link to="/account" onClick={closeSidebar}>Moje konto</Link></li>
              <li><Link to="/ticket" onClick={closeSidebar}>Bilet</Link></li>
              {/* NOTE: Must not be accessed from side bar */}
              <li><Link to="/ordersnacks" onClick={closeSidebar}>Przekąski</Link></li>
              <li><Link to="/filmdetails" onClick={closeSidebar}>Szczegóły filmu</Link></li>
              {/* <li><Link to="/reservation" onClick={closeSidebar}>Rezerwacja</Link></li> */}
              {/* <li><Link to="/confirmation" onClick={closeSidebar}>Potwierdzenie</Link></li> */}
              {/* NOTE: Both of them are kinds of conirm reservation */}
            </ul>
          </div>
        </>
      )}

    </div>
  );
};

export default Home;
