import { characterDates } from "@/constants";
import Bandera from "@/assets/img/bandera.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/constants/store";
import { DataCharacter, StatsCharacter } from "@/Object/Character";
import { setDataCharacter } from "@/constants/dataCharacterSlice";
import { setStats } from "@/constants/StatsSlice";


const Character = () => {
    const user = useSelector((state: RootState) => state.user);
    const datacharacter = useSelector((state: RootState) => state.dataCharacter);
    const stats = useSelector((state: RootState) => state.stats);
    const dispatch = useDispatch();

    const getCharacterDefaultInfo = async() => {
        try{
            const response = await fetch("http://localgost:3000/character_basic_data", {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if(!response.ok){
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const character : DataCharacter = data.data;
            dispatch(setDataCharacter(character));

        }catch(error){
            console.error("Error ", error);
        }
    }
    
    const getStats = async() => {
        try{
            const response = await fetch("http://localgost:3000/character_stats", {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if(!response.ok){
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const character : StatsCharacter = data.stats;
            dispatch(setStats(character));

        }catch(error){
            console.error("Error ", error);
        }
    }

    getStats();

    return (
        <div className="grid grid-cols-4 grid-rows-4">
        <div className="col-start-1 col-end-1 row-start-1 row-end-1">
            <div className="text-start text-7xl text-amber-400 wagon-font mt-3 ml-8 ">
                {user.name}
            </div>
            <div className="text-start text-4xl text-cyan-400 ml-8">
                Nivel: {stats.stats.level}
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
