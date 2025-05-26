import '../index.css';
import { useSelector } from 'react-redux' 
import characterImage from '@/assets/img/personaje_elfa_1.png';
import { RootState } from './store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export const navItems = [
    { label: "Features", href: "#" },
    { label: "Workflow", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Testimonials", href: "#" },
  ];

  export const itemEquiped = [
    {label: "arma", url: "#"},
    {label: "armadura",url: "#"},
    {label: "mascota", url: "#"}
  ];

  export const characterDates = {
    nivel: "12",
    characterURL: characterImage,
    clanShieldURL: "#",
  };

  export const useAuth = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
    }, [navigate]);
  };

  export interface ErrorResponse {
    error? : string; 
    message? : string; 
    statusCode? : string;
  }