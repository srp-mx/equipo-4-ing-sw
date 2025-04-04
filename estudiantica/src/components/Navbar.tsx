import { useState } from "react";
import logo from "@/assets/Logo.png";
import iconoInicio from "@/assets/img/sidebar/icono_inicio.png";
import { navItems } from "@/constants";
import { characterDates } from "@/constants";
import MenuProfile from "./MenuProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/constants/store";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const toggleNavBar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };


    return (
        <nav className="bg-[#0B090F] sticky top-0 z-50 py-3 backdrop-blur-lg  flex justify-between items-center p-4">
            <div className="flex ml-4 justify-between items-center text-2xl font-bold text-white ml-2">
                <img className="h-10 w-10 mr-4" src={logo} alt="logo" />
                <span className="text-2xl tracking-tight">Estudiantika</span>
            </div>
            {isLoggedIn ? (
                 
             <MenuProfile user={{name : user.name,email : user.email}}/>
            ) : (
                <div className="flex justify-center space-x-12 items-center">
                    <Link to="/register" 
                        className="pixel-corner-button py-2 px-3 border transition-all bg-[#cbda3d]"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
                    >
                        Sign up
                    </Link>
                    <Link to="/login"  
                        className="pixel-corner-button py-2 px-3 transition-all bg-[#cbda3d]"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg" : "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
                    >
                        Log in
                    </Link>
                </div>
            ) }
        </nav>
    );
}
