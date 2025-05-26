import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconoConfiguracion from "@/assets/img/sidebar/icono_configuracion.png";
import { clearUser } from "@/constants/userSlice";
import { clearClases } from "@/constants/classSlice";
import { clearAssignments } from "@/constants/assignmentSlice";
import { clearDataCharacter } from "@/constants/dataCharacterSlice";
import { clearStats } from "@/constants/StatsSlice";
import { clearRacha, setRacha } from "@/constants/rachaSlice";import { useDispatch } from "react-redux";
import iconoUser from "@/assets/img/icono_user.svg";
import iconoInicio from "@/assets/img/sidebar/icono_inicio.png";
import iconoLogout from "@/assets/img/icono_logout.png"
import { useLocation } from "react-router-dom";


const handleLogout = (dispatch : any, navigate : any) => {
    dispatch(clearUser());
    dispatch(clearClases());
    dispatch(clearAssignments());
    dispatch(clearStats());
    dispatch(clearDataCharacter());
    dispatch(clearRacha());
    localStorage.removeItem("token");

    navigate("/");
} 

export default function MenuProfile({user} : {user: {name: string, email: string}}) {
    const [viewMenu, setViewMenu] = useState(false);
    const location = useLocation()
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setViewMenu(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
        <div className="flex items-center mr-10" ref={menuRef}>
            <button type="button" 
                className="flex text-lg ml-3 py-2 px-3 border rounded-full bg-[#cbda3d] mr-4 transition-all hover:bg-white text-black" 
                id="user-menu-button" aria-expanded="false" 
                data-dropdown-toggle="user-dropdown" 
                data-dropdown-placement="bottom"
                onClick={() => setViewMenu(!viewMenu)}
                ref={buttonRef}
            >
                <div className="mr-3">
                    <img src={iconoUser} width={30}/>
                </div>
                {user.name || "Nombre de Usuario"}
            </button>
            {viewMenu && (
                <div 
                    className="absolute px-3 py-4 top-15  my-2 text-base list-none bg-[#1A1538] divide-y divide-gray-100 rounded-2xl shadow-sm" 
                    id="user-dropdown"
                >
                <ul className="text-white space-y-4" aria-labelledby="user-menu-button">
                    {location.pathname !== "/home" &&
                        <Link to='/home' className="block flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                            <img src={iconoInicio} className="mr-3"/>
                            Inicio
                        </Link>
                    }   
                    <Link to="/setting" className="block flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                        <img src={iconoConfiguracion} className="mr-3"/>
                        Configuración
                    </Link>
                    <Link to="/" className="block flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout(dispatch, navigate);
                        }}
                    >
                        <img src={iconoLogout} className="mr-3"/>
                        Cerrar sesión
                    </Link>
                </ul>
            </div>
            )}
        </div> 
    );
}