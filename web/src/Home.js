import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const getDates = () => {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit' };
    const labels = ['dzisiaj', 'jutro'];

    const result = [];

    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const label = labels[i] || date.toLocaleDateString('pl-PL', { weekday: 'long' });
      result.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        date: date.toLocaleDateString('pl-PL', options),
      });
    }

    return result;
  };

  const dates = getDates();


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="home-page">
      <div className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">nazwa aplikacji</Link>
        </h1>



        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

     <nav className="navigation-bar">
       Repertuar

       <div className="search-container">
         <i className="fa fa-search"></i>
         <input
           type="text"
           className="search-bar"
           placeholder="Szukaj..."
           value={searchQuery}
           onChange={handleSearchChange}
         />
       </div>
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

              <div className="filter-button-container">
                <button className="filter-button">Filtruj po gatunku</button>
              </div>
      </div>

    <div className="movie-grid-container">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="movie-tile">
          <div className="movie-box"></div>
          <div className="movie-title">Tytuł filmu {index + 1}</div>
          <button className="reserve-button">Zarezerwuj</button>
        </div>
      ))}
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
              <li><Link to="/reservation" onClick={closeSidebar}>Rezerwacja</Link></li>
              <li><Link to="/ordersnacks" onClick={closeSidebar}>Przekąski</Link></li>
              <li><Link to="/filmdetails" onClick={closeSidebar}>Szczegóły filmu</Link></li>
              <li><Link to="/ticket" onClick={closeSidebar}>Bilet</Link></li>
              <li><Link to="/confirmation" onClick={closeSidebar}>Potwierdzenie</Link></li>
            </ul>
          </div>
        </>
      )}

    </div>
  );
};

export default Home;
