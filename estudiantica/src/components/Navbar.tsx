import logo from "@/assets/Logo.png";
import MenuProfile from "./MenuProfle";
import { useSelector } from "react-redux";
import { RootState } from "@/constants/store";
import { Link, useNavigate } from "react-router-dom";
import iconoInicio from "@/assets/img/sidebar/icono_inicio.png";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Iconos de hamburguesa
import { useState } from "react";


export default function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-[#0B090F] sticky top-0 z-2 py-3 flex justify-between items-center p-4">
            <div
            onClick={() => navigate("/")}
            className="flex items-center text-2xl font-bold text-white cursor-pointer mb-2 md:mb-0">
                <img className="h-10 w-10 mr-3" src={logo} alt="logo" />
                <span className="hidden md:inline tracking-tight">Estudiantica</span>
            </div> 
            {isLoggedIn ? (
                <>
                {location.pathname !== "/home" && 
                    <div 
                    className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6"
                    onClick={() => navigate('/home')}>
                        <img className="h-8 w-8 sm:h-7 sm:w-7 mr-2" src={iconoInicio}/>
                        <span>Inicio</span>
                    </div>
                }
                
                <MenuProfile user={{name : user.name,email : user.email}}/>
                </>
            ) : (
                <div className="flex justify-center space-x-12 items-center">
                    <Link to="/register" 
                        className="pixel-corner-button py-2 px-3 border transition-all bg-[#cbda3d]"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
                    >
                        Registrar
                    </Link>
                    <Link to="/login"  
                        className="pixel-corner-button py-2 px-3 transition-all bg-[#cbda3d]"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg" : "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
                    >
                        Ingresar
                    </Link>
                </div>
            ) }
        </nav>
    );
}