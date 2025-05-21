import CalendarioImg from "@/assets/img/home/icono_calendario.png"
import TareasImg from "@/assets/img/home/icono_tareas.png";
import Decoracion from "@/assets/img/decoracion.png";
import decoracionMin from "@/assets/img/decoracion-min.png"
import HorarioImg from "@/assets/img/home/icono_horario.png";
import MateriaImg from "@/assets/img/home/icono_materias.png";
import { Link } from "react-router-dom";
export const Sidebar = ({ incomplete }: { incomplete?: boolean }) => {
    return (
        !incomplete ? (
            <div
                className="ml-5 row-span-4 text-white ml-4 text-3xl items-center justify-center text-center flex mt-6 flex-col mb-6 py-1 space-x-1 space-y-4"
            >
                <img src={Decoracion} />
                <Link to="/work"
                    className="pixel-corner-button bg-[#3992BF] flex items-center text-center w-full h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                    style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#3992BF", "--size-pixel": "20px" } as React.CSSProperties}
                >
                    <img src={TareasImg} className="w-10 h-10 mr-4 ml-4" />
                    <label className="text-2xl ml-4">Tareas</label>
                </Link>
                <Link to="/mazmorra"
                    className="pixel-corner-button bg-[#BF3939] flex items-center text-center w-full h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                    style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#BF3939", "--size-pixel": "20px" } as React.CSSProperties}
                >
                    <img src={HorarioImg} className="w-10 h-10 mr-4 ml-4" />
                    <label className="text-2xl ml-4">Mazmorra</label>
                </Link>
                <Link to="/class"
                    className="pixel-corner-button bg-[#39BF48] flex items-center text-center w-full h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                    style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#39BF48", "--size-pixel": "20px" } as React.CSSProperties}
                >
                    <img src={MateriaImg} className="w-10 h-10 mr-4 ml-4" />
                    <label className="text-2xl ml-4">Materias</label>
                </Link>
                <Link to="/calendar"
                    className="pixel-corner-button bg-[#BF7739] flex items-center text-center w-full h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                    style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#BF7739", "--size-pixel": "20px" } as React.CSSProperties}
                >
                    <img src={CalendarioImg} className="w-10 h-10 mr-4 ml-4" />
                    <label className="text-2xl ml-4">Calendario</label>
                </Link>
                <img src={Decoracion} />
            </div>
        ) : (
            <div
                className="row-span-4 ml-5 text-white text-3xl items-center flex mt-6 flex-col mb-6 py-1 space-x-1 space-y-4"
            >
                <img src={decoracionMin} />
                <Link to="/work"
                    className="pixel-corner-button bg-[#3992BF] flex items-center text-center h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                    style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#3992BF", "--size-pixel": "20px" } as React.CSSProperties}
                >
                    <img src={TareasImg} className="w-10 h-10" />
                </Link>
                <Link to="/mazmorra"
                    className="pixel-corner-button bg-[#BF3939] flex items-center text-center  h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                    style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#BF3939", "--size-pixel": "20px" } as React.CSSProperties}
                >
                    <img src={HorarioImg} className="w-10 h-10" />
                </Link>
                <Link to="/class"
                    className="pixel-corner-button bg-[#39BF48] flex items-center text-center  h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                    style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#39BF48", "--size-pixel": "20px" } as React.CSSProperties}
                >
                    <img src={MateriaImg} className="w-10 h-10" />                   
                </Link>
                <Link to="/calendar"
                    className="pixel-corner-button bg-[#BF7739] flex items-center text-center  h-1/4 px-4 py-4 transition hover:-translate-y-1 hover:scale-100 group"
                    style={{ "--pixel-bg": "#0B090F", "--pixel-hover-bg": "#BF7739", "--size-pixel": "20px" } as React.CSSProperties}
                >
                    <img src={CalendarioImg} className="w-10 h-10" />
                </Link>
                <img src={decoracionMin} />
            </div>
        )
    );
}
