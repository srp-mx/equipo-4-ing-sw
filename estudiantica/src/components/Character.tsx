import { characterDates } from "@/constants";
import Bandera from "@/assets/img/bandera.png";
import { useSelector } from "react-redux";
import { RootState } from "@/constants/store";

const Character = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="grid grid-cols-4 grid-rows-4">
        <div className="col-start-1 col-end-1 row-start-1 row-end-1">
            <div className="text-start text-7xl text-amber-400 wagon-font mt-3 ml-8 ">
                {user.name}
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

        </div>
        );
}

export default Character;
