import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from './pages/Login';
import WorkPage from './pages/WorkPage';
import ClassPage from './pages/ClassPage';
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home";
import Register from './pages/Register';
import Settings from './pages/Setting';

// Componente que cambia dinámicamente el background
const DynamicBackground = () => {
  const location = useLocation(); // Obtiene la ruta actual

  useEffect(() => {
    const body = document.body;
    
    // Mapeo de rutas a colores de fondo
    const backgrounds: Record<string, string> = {
      "/": "bg-[#2D314F] bg-gradient-to-br from-[#323A58] via-[#2D314F] to-[#1A1538]",   // LandingPage
      "/home": "bg-[#0B090F]",  // Home
      "/login": "bg-gray-800",  // Login
    };

    // Establece la clase de fondo en <body>
    body.className = backgrounds[location.pathname] || "bg-black";

  }, [location.pathname]); // Se ejecuta cuando cambia la ruta

  return null; // No renderiza nada, solo cambia el fondo
};


const App = () => {
  return (
    <Router>
      <DynamicBackground /> {/* Cambia el background dinámicamente */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/work' element={<WorkPage />} />
          <Route path='/class' element={<ClassPage />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
    </Router>
  );
};

export default App;
