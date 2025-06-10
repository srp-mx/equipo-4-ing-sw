import { useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from './pages/Login';
import CalendarPage from './pages/CalendarPage'
import WorkPage from './pages/WorkPage';
import ClassPage from './pages/ClassPage';
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Register from './pages/Register';
import Dungeon from './pages/Dungeon';
import Setting from './pages/Setting';
import Inicio from './pages/Inicio';

const DynamicBackground = () => {
  const location = useLocation(); // Obtiene la ruta actual

  useEffect(() => {
    const body = document.body;
    
    const backgrounds: Record<string, string> = {
      "/": "bg-[#0B090F]",   // LandingPage
      "/home": "bg-[#0B090F]",  // Home
      "/login": "bg-gray-800",  // Login
    };

    body.className = backgrounds[location.pathname] || "bg-black";

  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <DynamicBackground/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/work' element={<WorkPage/>} />
        <Route path='/class' element={<ClassPage/>} />
        <Route path="/calendar" element={<CalendarPage/>}/>
        <Route path='/dungeon' element={<Dungeon/>}/>
        <Route path='/setting' element={<Setting/>}/>
        <Route path='/prueba' element={<Inicio/>}/> 
      </Routes> 
    </Router>
  );
};

export default App;
