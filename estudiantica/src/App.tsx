import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import WorkPage from './pages/WorkPage';
import ClassPage from './pages/ClassPage';
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home";
import Register from './pages/Register';
import Settings from './pages/Setting';

type AuthValidation = {
  isValid: boolean;
};

const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:3000/validate-token", {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) return false;
    const data: AuthValidation = await response.json();
    return data.isValid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      
      try {
        const isValid = await validateToken(token);
        setIsAuthenticated(isValid);
        if (!isValid) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (isAuthenticated === null) {
      return <div className="flex h-screen items-center justify-center">Cargando...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    if (isAuthenticated === null) {
      return <div className="flex h-screen items-center justify-center">Cargando...</div>;
    }
    return !isAuthenticated ? children : <Navigate to="/home" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } />
        
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/login" element={
          <PublicRoute>
            <Login onLogin={() => setIsAuthenticated(true)} />
          </PublicRoute>
        } />
        
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        <Route path='/work' element={
          <ProtectedRoute>
            <WorkPage />
          </ProtectedRoute>
        } />
        
        <Route path='/class' element={
          <ProtectedRoute>
            <ClassPage />
          </ProtectedRoute>
        } />
        
        <Route path="/setting" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;