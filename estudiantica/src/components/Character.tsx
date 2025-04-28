import { characterDates } from "@/constants";
import Bandera from "@/assets/img/bandera.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/constants/store";
import { DataCharacter, RachaCharacter, StatsCharacter } from "@/Object/Character";
import { setDataCharacter } from "@/constants/dataCharacterSlice";
import { setStats } from "@/constants/StatsSlice";
import { useEffect, useState } from "react";
import { setRacha } from "@/constants/rachaSlice";
import ModalCharacterCreation from '@/components/Character/ModalCharacterCreation'
import { Flame } from "lucide-react";
import { getPointSkill } from "./Character/Stats";

const getRefresh = async(dispatch:any) => {
    try{
        const response = await fetch("http://localhost:3000/character_next_refresh", {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        if(!response.ok)
            throw new Error(`Error: ${response.status} ${response.statusText}`)

        const data = await response.json();
        const rachaCharacter : RachaCharacter = data; 
        dispatch(setRacha(rachaCharacter));
    }catch(error){
        console.error("Error ", error);
    }
}


const getStats = async(dispatch:any) => {
    try{
        const response = await fetch("http://localhost:3000/character_stats", {
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

const getCharacterDefaultInfo = async(dispatch:any) => {
    try{
        const response = await fetch("http://localhost:3000/character_basic_data", {
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


const Character = () => {
    const [showModal, setShowModal] = useState(false)
    const user = useSelector((state: RootState) => state.user);
    const datacharacter = useSelector((state: RootState) => state.dataCharacter);
    const stats = useSelector((state: RootState) => state.stats);
    const rachaRefresh = useSelector((state: RootState) => state.racha);
    const dispatch = useDispatch();
    
    useEffect(() => {
        async function characterHome(){
            await getRefresh(dispatch);
            if(rachaRefresh.racha.alive){
                console.log("hola");
                await getCharacterDefaultInfo(dispatch);
                await getStats(dispatch);
                await getPointSkill(dispatch);
            }
        }
        characterHome();
    },[dispatch, rachaRefresh.racha.alive]);

    if(rachaRefresh.racha.alive)
        return (
            <div className="grid grid-cols-4 grid-rows-4">
            
            <div className="col-start-1 col-end-1 row-start-1 row-end-1">
                <div className="text-xl text-amber-400 wagon-font mt-3 ml-8 space-x-2 space-y-1 bg-black/10 text-center rounded-full border-2 border-amber-400/30">
                    {datacharacter.dataCharacter.name}
                </div>
                <div className="flex flex-row justify-items-start text-xl text-red-500 wagon-font mt-3 ml-8 py-1 bg-black/10 text-center rounded-full border-2 border-red-500/30 w-2/5">
                    <Flame className="ml-1 mr-1"/>
                    {datacharacter.dataCharacter.streak}
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
    else return (
        <div className="flex items-center justify-center w-full h-7/8">
          <button
          onClick={() => setShowModal(true)}
          className="flex px-3 py-2 bg-green-600 font-bold rounded-full hover:bg-green-500 text-white items-center"
          > 
              Crear Personaje
          </button>
          {showModal && <ModalCharacterCreation onClose={() => setShowModal(false)} /> }
        </div> 
    );
}

export default Character;
