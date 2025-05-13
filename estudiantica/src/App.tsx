import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import CalendarPage from './pages/CalendarPage'
import WorkPage from './pages/WorkPage';
import ClassPage from './pages/ClassPage';
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home";
import Register from './pages/Register';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/work' element={<WorkPage/>} />
        <Route path='/class' element={<ClassPage/>} />
        <Route path="/calendar" element={<CalendarPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
