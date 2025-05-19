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
                    <Link to='/home' className="block flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                        <img src={iconoInicio} className="mr-3"/>
                        Inicio
                    </Link>
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#cbda3d" fill="#cbda3d" id="Interface-Essential-Signout-Logout--Streamline-Pixel" height="30" width="30" className="mr-3">
                            <g><path d="m18.85875 6.855 0 3.4275 -4.574999999999999 0 0 2.2874999999999996 4.574999999999999 0 0 3.4275 1.1400000000000001 0 0 -1.1400000000000001 1.1475 0 0 -1.1400000000000001 1.1400000000000001 0 0 -1.1475 1.1400000000000001 0 0 -2.2874999999999996 -1.1400000000000001 0 0 -1.1400000000000001 -1.1400000000000001 0 0 -1.1400000000000001 -1.1475 0 0 -1.1475 -1.1400000000000001 0z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="M15.431249999999999 15.997499999999999h1.1400000000000001v4.574999999999999h-1.1400000000000001Z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="M15.431249999999999 1.1400000000000001h1.1400000000000001v5.715h-1.1400000000000001Z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="m10.85625 22.86 0 -1.1475 4.574999999999999 0 0 -1.1400000000000001 -4.574999999999999 0 0 -14.857499999999998 -1.1400000000000001 0 0 17.145 1.1400000000000001 0z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="M6.28875 22.86h3.4275V24h-3.4275Z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="M7.428749999999999 12.57h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="M7.428749999999999 4.574999999999999h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="M4.00125 21.7125h2.2874999999999996v1.1475h-2.2874999999999996Z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="M5.14125 3.4275h2.2874999999999996V4.574999999999999h-2.2874999999999996Z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="M1.71375 20.572499999999998h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="M2.86125 2.2874999999999996h2.2800000000000002v1.1400000000000001h-2.2800000000000002Z" fill="#cbda3d" stroke-width="0.75"></path>
                                <path d="m1.71375 0 0 1.1400000000000001 -1.1400000000000001 0 0 19.4325 1.1400000000000001 0 0 -18.285 1.1475 0 0 -1.1475 12.57 0 0 -1.1400000000000001 -13.7175 0z" fill="#cbda3d" stroke-width="0.75"></path>
                            </g>
                        </svg>
                        Cerrar sesión
                    </Link>
                </ul>
            </div>
            )}
        </div> 
    );
}