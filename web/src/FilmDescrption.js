import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FilmDescription.css';

function MovieDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const  id  = 1;
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/movie/movie/${id}?id=${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Błąd pobierania filmu:', error);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <div className="movie-page">
      <header className="navbar">
        <h1 className="app-title">
          <Link to="/" className="app-link">Cinema43</Link>
        </h1>
        <button className="hamburger" onClick={toggleSidebar}>☰</button>
      </header>

      <nav className="navigation-bar">{movie?.title || 'Sczegóły filmu'}</nav>

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

      <div className="movie-ds-content">
        <div className="movie-ds-poster"></div>
        <div className='movie-ds-texts'>
          <h2 className="movie-ds-title">{movie?.title || 'Tytuł filmu'}</h2>
          <div className="movie-ds-description">
            <p className="movie-ds-text">{movie?.description || 'opis filmu'}</p>
          </div>
          <div className="button-container">
            <button className="reserve-button">Zarezerwuj</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
