import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login'; 
import ReservationView from './ReservationView';
import SnackView from './SnackView';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservation" element={<ReservationView />} />
        <Route path="/ordersnacks" element={<SnackView />} />
      </Routes>
    </Router>
  );
}

export default App;
