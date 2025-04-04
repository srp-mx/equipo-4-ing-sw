import NavBar from "../components/Navbar";
import Character from "../components/Character";
import SideBar from "../components/SideBar";
import CalendarioImg from "@/assets/img/home/icono_calendario.png"
import TareasImg from "@/assets/img/home/icono_tareas.png";
import Decoracion from "@/assets/img/decoracion.png";
import HorarioImg from "@/assets/img/home/icono_horario.png";
import MateriaImg from "@/assets/img/home/icono_materias.png";
import { Link } from "react-router-dom";

export default function Home(){
    return (
         <div className="bg-[#0B090F] items-justify h-screen w-screen bg-cover bg-center">
            <NavBar isLoggedIn={true}/>
            <SideBar/>
            <div className="grid grid-cols-4 grid-rows-4 gap-2 h-17/20">
                <div className="col-span-3 row-span-4 p-4 sm:ml-56 bg-[url(assets/img/login_bg.jpg)] sm:mr-4 rounded-2xl">
                    <Character />
                    
                </div>
                <div className="row-span-4 col-start-4 text-3xl items-center justify-center text-center flex mt-6 flex-col
                mb-6 mr-10 py-1 space-x-1 space-y-4">
                    <img src={Decoracion}/>
                    <Link to="/work" // bg-gradient-to-r bg-red-500 to-red-600 hover:bg-red-800
                        className="pixel-corner-button bg-[#BF3939] flex items-center text-center w-full h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg" : "#BF3939" ,"--size-pixel" : "20px"} as React.CSSProperties}
                    >
                        <img src={TareasImg} alt="" className="w-10 h-10 mr-4 ml-4" />
                        <label className="text-white ml-4">Tareas</label>
                    </Link>
                    <Link to="/home" 
                        className="pixel-corner-button bg-[#3992BF] flex items-center text-center w-full h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg" : "#3992BF" ,"--size-pixel" : "20px"} as React.CSSProperties}
                    >
                        <img src={HorarioImg} alt="" className="w-10 h-10 mr-4 ml-4" />
                        <label className="text-white ml-4">Horario</label>
                    </Link>
                    <Link to="/class" 
                        className="pixel-corner-button bg-[#39BF48] flex items-center text-center w-full h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg" : "#39BF48" ,"--size-pixel" : "20px"} as React.CSSProperties}
                    >
                        <img src={MateriaImg} alt="" className="w-10 h-10 mr-4 ml-4" />
                        <label className="text-white ml-4">Materias</label>
                    </Link>
                    <Link to="/home" 
                        className="pixel-corner-button bg-[#BF7739] flex items-center text-center w-full h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group" 
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg" : "#BF7739" ,"--size-pixel" : "20px"} as React.CSSProperties}
                    >   
                        <img src={CalendarioImg} alt="" className="w-10 h-10 mr-4 ml-4" />      
                        <label className="text-white ml-4">Calendario</label>
                    </Link>
                    <img src={Decoracion}/>
                </div>
            </div>
        </div>
    );    
}