import {Menu, X} from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/Logo.png";
import '@/index.css'
import { navItems } from "@/constants";
import { characterDates } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/constants/store";
import { useNavigate } from "react-router-dom";
import { clearUser } from "@/constants/userSlice";
import { clearClases } from "@/constants/classSlice";
import { clearAssignments } from "@/constants/assignmentSlice";
import { clearDataCharacter } from "@/constants/dataCharacterSlice";
import { clearStats } from "@/constants/StatsSlice";
import { clearRacha } from "@/constants/rachaSlice";
import { getRefresh } from "../Character";
import { clearInterval } from "timers";

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

const refreshToken = async(dispatch:any) => {
    try{
        const response = await fetch("http://localhost:3000/refresh_token", {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + localStorage.getItem("token"), 
            }
        });
        if(!response.ok){
            throw new Error(`E: ${response.status} ${response.body}`)
        }
        const data = await response.json();
        localStorage.setItem("token", data.token);
    }catch(error){
        console.error("Error ", error);
    }
}

const NavBar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const toggleNavBar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const racha = useSelector((state : RootState ) => state.racha);

    useEffect(() => {
        const interval = setInterval(() => {
            getRefresh(dispatch);
        }, racha.racha.next_check);
        return () => clearInterval(interval);
    },[racha.racha.next_check, dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            refreshToken(dispatch);
        }, 60*60*1000);
        return () => clearInterval(interval);
    },[dispatch]);

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b
        border-neutral-700 opacity-80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
                        <span className="text-xl tracking-tight">Estudiantica</span>
                    </div>

                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <a href="#" className="flex text-lg py-2 px-3 border rounded-full bg-[#cbda3d] mr-4 transition-all hover:bg-white text-black">
                            <div className="mr-3">
                                <img src="assets/img/icono_user.svg"/>
                            </div>
                            {user.name}
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
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavBar}> 
                            {mobileDrawerOpen ? <X /> : <Menu /> }
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <ul>
                        {navItems.map((item,index) => (
                            <li key={index} className="py-4">
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                        </ul>
                        <div className="flex space-x-6">
                            <a href="#" className="py-2 px-3 border rounded-md">
                                {user.name}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
