import { characterDates } from "@/constants";
import Bandera from "@/assets/img/bandera.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "@/constants/store";
import ItemsEquiped from "../components/ItemsEquiped";


const Character = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        /*<div className="grid grid-cols-4 grid-rows-4">
        <div className="col-start-1 col-end-1 row-start-1 row-end-1">
            <div className="text-start text-7xl text-amber-400 wagon-font mt-3 ml-8 ">
                {user.name || "Nombre de Usuario"}
            </div>
            <div className="text-start text-4xl text-cyan-400 ml-8">
                Nivel: {characterDates.nivel}
            </div>
        </div>
        <div className="mt-12 ml-4 col-start-2 col-end-3 row-start-1 row-end-5">
            <img src={characterDates.characterURL} alt="" className="ml-15" />
        </div>

        <div className="col-start-4 col-end-4 row-start-1 row-end-2">
            <img src={Bandera} alt="" className="h-6/7 w-6/7" />    
        </div>

        </div>*/


        <div className="grid grid-cols-4 grid-rows-4 gap-4 justify-items-center h-full">
            <div className="col-span-3 row-span-4 h-full">
                <div className="h-1/15">
                    <div className="title-section text-start text-5xl wagon-font mt-3 ml-8 ">
                        {user.name || "Nombre de Usuario"}
                    </div>
                    <div className="text-start text-4xl text-cyan-400 ml-8">
                        Nivel: {characterDates.nivel || 0} 
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                    <img src={characterDates.characterURL} alt="" className="h-2/3 mb-5" />
                    <Link to="#" 
                        className="pixel-corner-button py-2 px-3 border transition-all bg-[#cbda3d]"
                        style={{ "--pixel-bg": "#2D304F", "--pixel-hover-bg": "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
                    >
                        Editar
                    </Link>
                </div>
            </div>
            <div className="row-span-4 col-start-4 mt-6 items-center justify-center h-full">
                <img src={Bandera} alt="" className="mb-4 h-1/3"/>
                <ItemsEquiped />
            </div>
        </div>
    
    
    );
}

export default Character;
