import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconoConfiguracion from "@/assets/img/sidebar/icono_configuracion.png";
import { clearUser } from "@/constants/userSlice";
import { useDispatch } from "react-redux";
import iconoUser from "@/assets/img/icono_user.svg";



const handleLogout = (dispatch : any, navigate : any) => {
    dispatch(clearUser());
    localStorage.removeItem("token");

    navigate("/");
} 

export default function MenuProfile({user} : {user: {name: string, email: string}}) {
    const [viewMenu, setViewMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [buttonWidth, setButtonWidth] = useState(60);
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

    useEffect(() => {
        if (buttonRef.current) {
            setButtonWidth(buttonRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className="flex items-center" ref={menuRef}>
            <button type="button" 
                className="flex text-lg py-2 px-3 border rounded-full bg-[#cbda3d] mr-4 transition-all hover:bg-white text-black" 
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
                    className="absolute px-3 py-4 top-15 z-50 my-4 text-base list-none bg-[#1A1538] divide-y divide-gray-100 rounded-2xl shadow-sm" 
                    id="user-dropdown"
                    style ={{ width: buttonWidth }}
                >
                <ul className="text-white space-y-4" aria-labelledby="user-menu-button">
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

/*<div className="hidden lg:flex justify-center space-x-12 items-center">
    <a href="#" className="flex text-lg py-2 px-3 border rounded-full bg-[#cbda3d] mr-4 transition-all hover:bg-white text-black">
        <div className="mr-3">
            <img src="assets/img/icono_user.svg"/>
        </div>
        {user.name || "Nombre de Usuario"}
    </a>
    <a href="#" className=" -top-3 left-8 flex items-center text-[#cbda3d] hover:text-white transition-all focus:text-[#ffffff]"
    onClick={(e) => {
        e.preventDefault();
        handleLogout(dispatch, navigate);
    }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" id="Interface-Essential-Signout-Logout--Streamline-Pixel" height="24" width="24">
        <g><path d="m18.85875 6.855 0 3.4275 -4.574999999999999 0 0 2.2874999999999996 4.574999999999999 0 0 3.4275 1.1400000000000001 0 0 -1.1400000000000001 1.1475 0 0 -1.1400000000000001 1.1400000000000001 0 0 -1.1475 1.1400000000000001 0 0 -2.2874999999999996 -1.1400000000000001 0 0 -1.1400000000000001 -1.1400000000000001 0 0 -1.1400000000000001 -1.1475 0 0 -1.1475 -1.1400000000000001 0z" fill="currentColor" stroke-width="0.75"></path>
            <path d="M15.431249999999999 15.997499999999999h1.1400000000000001v4.574999999999999h-1.1400000000000001Z" fill="currentColor" stroke-width="0.75"></path>
            <path d="M15.431249999999999 1.1400000000000001h1.1400000000000001v5.715h-1.1400000000000001Z" fill="currentColor" stroke-width="0.75"></path>
            <path d="m10.85625 22.86 0 -1.1475 4.574999999999999 0 0 -1.1400000000000001 -4.574999999999999 0 0 -14.857499999999998 -1.1400000000000001 0 0 17.145 1.1400000000000001 0z" fill="currentColor" stroke-width="0.75"></path>
            <path d="M6.28875 22.86h3.4275V24h-3.4275Z" fill="currentColor" stroke-width="0.75"></path>
            <path d="M7.428749999999999 12.57h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" fill="currentColor" stroke-width="0.75"></path>
            <path d="M7.428749999999999 4.574999999999999h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" fill="currentColor" stroke-width="0.75"></path>
            <path d="M4.00125 21.7125h2.2874999999999996v1.1475h-2.2874999999999996Z" fill="currentColor" stroke-width="0.75"></path>
            <path d="M5.14125 3.4275h2.2874999999999996V4.574999999999999h-2.2874999999999996Z" fill="currentColor" stroke-width="0.75"></path>
            <path d="M1.71375 20.572499999999998h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" fill="currentColor" stroke-width="0.75"></path>
            <path d="M2.86125 2.2874999999999996h2.2800000000000002v1.1400000000000001h-2.2800000000000002Z" fill="currentColor" stroke-width="0.75"></path>
            <path d="m1.71375 0 0 1.1400000000000001 -1.1400000000000001 0 0 19.4325 1.1400000000000001 0 0 -18.285 1.1475 0 0 -1.1475 12.57 0 0 -1.1400000000000001 -13.7175 0z" fill="currentColor" stroke-width="0.75"></path>
        </g>
    </svg>
    <span className="ml-2 text-sm">Log out</span>

    </a>
</div>


                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" id="Interface-Essential-Signout-Logout--Streamline-Pixel" height="30" width="30" className="mr-3"><desc>Interface Essential Signout Logout Streamline Icon: https://streamlinehq.com</desc><title>interface-essential-signout-logout</title><g><path d="m23.5734375 8.568750000000001 0 4.284375000000001 -5.71875 0 0 2.859375 5.71875 0 0 4.284375000000001 1.425 0 0 -1.425 1.434375 0 0 -1.425 1.425 0 0 -1.434375 1.425 0 0 -2.859375 -1.425 0 0 -1.425 -1.425 0 0 -1.425 -1.434375 0 0 -1.434375 -1.425 0z" fill="#000000" stroke-width="0.9375"></path><path d="M19.2890625 19.996875h1.425v5.71875h-1.425Z" fill="#000000" stroke-width="0.9375"></path><path d="M19.2890625 1.425h1.425v7.14375h-1.425Z" fill="#000000" stroke-width="0.9375"></path><path d="m13.5703125 28.575 0 -1.434375 5.71875 0 0 -1.425 -5.71875 0 0 -18.571875 -1.425 0 0 21.43125 1.425 0z" fill="#000000" stroke-width="0.9375"></path><path d="M7.8609374999999995 28.575h4.284375000000001V30h-4.284375000000001Z" fill="#000000" stroke-width="0.9375"></path><path d="M9.2859375 15.712500000000002h1.425v2.859375h-1.425Z" fill="#000000" stroke-width="0.9375"></path><path d="M9.2859375 5.71875h2.859375v1.425h-2.859375Z" fill="#000000" stroke-width="0.9375"></path><path d="M5.0015625 27.140625h2.859375v1.434375h-2.859375Z" fill="#000000" stroke-width="0.9375"></path><path d="M6.4265625 4.284375000000001h2.859375V5.71875h-2.859375Z" fill="#000000" stroke-width="0.9375"></path><path d="M2.1421875000000004 25.715625h2.859375v1.425h-2.859375Z" fill="#000000" stroke-width="0.9375"></path><path d="M3.5765625 2.859375h2.85v1.425h-2.85Z" fill="#000000" stroke-width="0.9375"></path><path d="m2.1421875000000004 0 0 1.425 -1.425 0 0 24.290625 1.425 0 0 -22.85625 1.434375 0 0 -1.434375 15.712500000000002 0 0 -1.425 -17.146874999999998 0z" fill="#000000" stroke-width="0.9375"></path></g></svg>
*/