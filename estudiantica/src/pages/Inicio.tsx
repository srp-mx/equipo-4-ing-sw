import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import bgImage from '@/assets/img/background-default.jpg';
import { Link } from "react-router-dom";
import CalendarioImg from "@/assets/img/home/icono_calendario.png"
import TareasImg from "@/assets/img/home/icono_tareas.png";
import Decoracion from "@/assets/img/decoracion.png";
import decoracionMin from "@/assets/img/decoracion-min.png"
import HorarioImg from "@/assets/img/home/icono_horario.png";
import MateriaImg from "@/assets/img/home/icono_materias.png";


export default function Inicio() {
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-center flex flex-col">
            <Navbar isLoggedIn={true} />

            <div className="flex flex-col-reverse md:grid md:grid-cols-10 md:grid-rows-4 gap-2 flex-1 w-full">
                
                <div className="flex justify-around md:flex-col md:row-span-4 md:ml-5 md:mt-6 text-white text-3xl items-center py-2 md:py-1 space-x-4 md:space-x-0 md:space-y-4">
                    <img src={decoracionMin} className="hidden md:block" />
                    
                    <Link to="/work" 
                        className="pixel-corner-button bg-[#3992BF] p-2"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#3992BF", "--size-pixel": "10px" } as React.CSSProperties}
                    >
                        <img src={TareasImg} className="w-10 h-10" />
                    </Link>
                    <Link to="/dungeon" 
                        className="pixel-corner-button bg-[#BF3939] p-2"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#BF3939", "--size-pixel": "10px" } as React.CSSProperties}
                    >
                        <img src={HorarioImg} className="w-10 h-10" />
                    </Link>
                    <Link to="/class" 
                        className="pixel-corner-button bg-[#39BF48] p-2"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#39BF48", "--size-pixel": "10px" } as React.CSSProperties}
                    >
                        <img src={MateriaImg} className="w-10 h-10" />
                    </Link>
                    <Link to="/calendar" 
                        className="pixel-corner-button bg-[#BF7739] p-2"
                        style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#BF7739", "--size-pixel": "10px" } as React.CSSProperties}
                    >
                        <img src={CalendarioImg} className="w-10 h-10" />
                    </Link>

                    <img src={decoracionMin} className="hidden md:block" />
                </div>

                <div
                    className="md:col-span-9 md:row-span-4 h-full p-4 mx-4 rounded-2xl"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover'
                    }}
                >
                </div>
            </div>
        </div>
    );
}
