import '../index.css';
import { useSelector } from 'react-redux' 
import characterImage from '@/assets/img/personaje_elfa_1.png';
import { RootState } from './store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CalendarioImg from "@/assets/img/home/icono_calendario.png"
import TareasImg from "@/assets/img/home/icono_tareas.png";
import DungeonImg from "@/assets/img/home/icono_horario.png";
import MateriaImg from "@/assets/img/home/icono_materias.png";


export const navItems = [
  {
    label: "Tareas",
    style : { "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#3992BF"} as React.CSSProperties, 
    img : TareasImg,
    link : "/work",
    color: "#3992BF"
  },
  {
    label: "Mazmorra",
    style : { "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#BF3939"} as React.CSSProperties,
    img : DungeonImg,
    link : "/dungeon",
    color: "#BF3939"
  },
  {
    label: "Materias",
    style : { "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#39BF48"} as React.CSSProperties,
    img : MateriaImg,
    link : "/class",
    color: "#39BF48"
  },
  {
    label: "Calendario",
    style : { "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#BF7739"} as React.CSSProperties,
    img : CalendarioImg,
    link : "/calendar",
    color: "#BF7739"
  }
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