import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login'; 
import SnackView from './SnackView';
import FilmDescription from './FilmDescrption';
import Home from './Home';
import Account from './Account';
import PlaceReservationView from './PlaceReservationView';
import TicketView from './TicketView';
import MyTickets from './MyTickets';
import ReservationView from './ReservationView';
import Confirmation from './Confirmation';
import Logout from './Logout';
import CinemaHall from './CinemaHall';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/mytickets" element={<MyTickets />} />
        <Route path="/ticket" element={<TicketView />} />
        <Route path="/filmdetails" element={<FilmDescription />} />
        <Route path="/ordersnacks" element={<SnackView />} />
        <Route path="/placereservation" element={<PlaceReservationView />} />
        {/* it is decided that no use for them */}
        <Route path="/reservation" element={<ReservationView />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cinema" element={<CinemaHall />} />
      </Routes>
    </Router>
  );
}

export default App;

// Reservation procedure
//
// Login / Register
// V
// Home page
// I
// V -- choose film
// I
// Film details
// I
// V -- reserve pressed
// I
// Choose seat
// I
// V -- Reserved back to home
// I
// Home page

// View your reservations procedure
// 
// Login / Register
// V
// Select My Tickets (Opens view with all tickets)
// I
// V -- chose needed one
// I
// opens chosen ticket with more info inside, and from here is possible to order snacks