import Start from '@/assets/Start.png'
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h1 className="text-white tektur-font text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                Estudiantica es para los estudiantes
                <span className=" bg-gradient-to-r from-[#cbda3d] to-[#ebf496] text-transparent bg-clip-text"> {" "}aventureros </span>
            </h1>
            <p className="mt-10 text-lg text-center text-white max-w-4xl"> Ha llegado la hora de que organices tu vida estudiantil. Toma tus espadas y recoge las flechas necesarias para salir a la aventura, conquistando todas tus materias una mazmorra a la vez. Tareas, horarios y promedios, cada uno de ellos esperando ser conquistado.</p>
            <div className="flex justify-center my-10">
                <Link to="/register" 
                    className="bg-[#cbda3d] pixel-corner-button py-3 px-4 mx-3"
                    style={{ "--pixel-bg": "#2D3250" , "--pixel-hover-bg" : "#FFFFFF","--size-pixel" : "10px"} as React.CSSProperties}
                >
                    Inicia gratis
                </Link>
            </div>
            <div className="mt-10 flex flex-col md:flex-row w-full items-center justify-center px-4">
                <img
                    className="rounded-lg border border-[#cbda3d] md:w-1/2 shadow-blue-400 mx-2 my-4 w-full max-w-md"
                    src={Start}
                    alt="Start"
                />
                
                <div className="flex flex-col md:w-1/2 items-center md:items-start md:ml-8 max-w-4xl">
                    <p className="mt-6 text-base md:text-lg text-center lg:text-left text-white">
                    Estudiar nunca ha sido tan simple y emocionante, no sólo estarás bien organizado sino que también conseguirás gran loot. Además de eso, podrás presumirle el grado de estudiante que eres a todos tus amigos (o enemigos).
                    </p>
                    <p className="mt-6 text-base md:text-lg text-center lg:text-left text-white">
                    Disfruta de nuestra historia y llega a tu objetivo de vida acompañado del mejor amigo del estudiante 😼. Cambia tu relación con tu vida estudiantil y disfruta aprender.
                    </p>
                </div>
            </div>

        </div>
        
    );
};

export default HeroSection;