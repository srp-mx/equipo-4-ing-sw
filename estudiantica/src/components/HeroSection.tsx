import Start from '@/assets/Start.png'

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h1 className="tektur-font text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                Estudiantica es para los estudiantes
                <span className=" bg-gradient-to-r from-blue-400 to-blue-900 text-transparent bg-clip-text"> {" "}aventureros </span>
            </h1>
            <p className="mt-10 text-lg text-center text-neutral-400 max-w-4xl"> Ha llegado la hora de que organices tu vida estudiantil. Toma tus espadas y recoge las flechas necesarias para salir a la aventura, conquistando todas tus materias una mazmorra a la vez. Tareas, horarios y promedios, cada uno de ellos esperando ser conquistado.</p>
            <div className="flex justify-center my-10">
                <a href="#" className="bg-gradient-to-r from-blue-400 to-blue-900 py-3 px-4 mx-3 rounded-md">
                    Start for free
                </a>
            </div>
            <div className="flex mt-10 justify-center">
                <img className="rounded-lg w-1/2 border border-blue-800 shadow-blue-400 mx-2 my-4 " src={Start} alt="Start" />
                <div className="rounded-lg w-1/2 ">
                <p className="mt-10 text-lg text-center text-neutral-400 max-w-4xl">
                Estudiar nunca ha sido tan simple y emocionante, no sólo estarás bien organizado sino que también conseguiras gran loot. Además de eso, podrás presumirle el grado de estudiante que eres a todos tus amigos (o enemigos).
                </p>
                <p className="mt-10 text-lg text-center text-neutral-400 max-w-4xl">
                Disfruta de nuestra historia y llega a tu objetivo de vida acompañado del mejor amigo del estudiante 😼. Cambia tu relación con tu vida estudiantil y disfruta aprender.
                </p>
                </div>
                
            </div>
        </div>
        
    );
};

export default HeroSection;