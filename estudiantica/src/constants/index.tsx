import '../index.css';
import { useSelector } from 'react-redux' 
import iconoInicio from '@/assets/img/sidebar/icono_inicio.png';
import iconoClanes from '@/assets/img/sidebar/icono_clanes.png';
import iconoMazmorras from '@/assets/img/sidebar/icono_mazmorras.png';
import iconoOtros from '@/assets/img/sidebar/icono_otros.png';
import iconoConfiguracion from '@/assets/img/sidebar/icono_configuracion.png';
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

  export const navItemsCharacter = [
    {label: "Inicio", href: "/home", imagen: iconoInicio },
    {label: "Clanes", href: "#", imagen: iconoClanes },
    {label: "Mazmorras", href: "#", imagen: iconoMazmorras},
    {label: "Otros", href: "#", imagen: iconoOtros}
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