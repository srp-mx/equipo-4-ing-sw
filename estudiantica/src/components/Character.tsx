import { characterDates } from "@/constants";
import Bandera from "@/assets/img/bandera.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/constants/store";
import { DataCharacter, RachaCharacter, StatsCharacter } from "@/Object/Character";
import { setDataCharacter } from "@/constants/dataCharacterSlice";
import { setStats } from "@/constants/StatsSlice";
import { useEffect, useState } from "react";
import { setAlive, setRacha } from "@/constants/rachaSlice";
import ModalCharacterCreation from '@/components/Character/ModalCharacterCreation'
import { Flame } from "lucide-react";
import { getPointSkill } from "./Character/Stats";
import EditModal from '@/components/Character/EditModal'
import ItemsEquiped from "./ItemsEquiped";
import rachaIcon from "@/assets/img/racha.png";
import { Button } from "./Button";

export const getRefresh = async(dispatch:any) => {
    try{
        const response = await fetch("http://localhost:3000/character_next_refresh", {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        if(!response.ok)
            throw new Error(`Error: ${response.status} ${response.statusText} ${response.body}`)

        console.log("Ya hice refresh del timer");
        const data = await response.json();
        const rachaCharacter : RachaCharacter = data; 
        dispatch(setRacha(rachaCharacter));
    }catch(error){
        console.error("Error ", error);
    }
}


export const getStats = async(dispatch:any) => {
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

export const getCharacterDefaultInfo = async(dispatch:any) => {
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
        dispatch(setAlive(data.alive));
        dispatch(setDataCharacter(character));

    }catch(error){
        console.error("Error ", error);
    }
}


const Character = () => {
    const [showModal, setShowModal] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const datacharacter = useSelector((state: RootState) => state.dataCharacter);
    const stats = useSelector((state: RootState) => state.stats);
    const rachaRefresh = useSelector((state: RootState) => state.racha);
    const dispatch = useDispatch();
    /*
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
*/
    return (
        <>
        {rachaRefresh.racha.alive ?
            (<div className="grid grid-cols-4 grid-rows-4 gap-2 h-7/8 w-full">
                <div className="col-span-3 row-span-4">
                    <div className="h-1/15 text-left justify-center">
                        <div className="title-section text-start text-[30px] sm:text-[40px] lg:text-[60px] mt-3 ml-8">
                            {user.name || "Nombre de Usuario"}
                        </div>
                        <div className="text-start text-[30px] sm:text-[40px] lg:text-[60px] text-red-400 ml-8">
                            <img src={rachaIcon} alt="" className="h-10 w-10 inline-block mr-2" />
                            {datacharacter.dataCharacter.streak}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full">
                        <img src={characterDates.characterURL} alt="" className="h-7/12 sm:2/3 mb-5" />
                        <button onClick={() => setShowModalEdit(true)}
                            className="pixel-corner-button py-2 px-3 border transition-all bg-[#cbda3d] text-base"
                            style={{ "--pixel-bg": "#2D304F", "--pixel-hover-bg": "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
                        >Editar</button>
                        {showModalEdit && <EditModal onClose={() => setShowModalEdit(false)}/>}
                    </div>
                </div>
                <div className="flex-col flex items-center row-span-4 col-start-4">
                    <img src={Bandera} alt="" className="mb-2 w-30"/>
                    <ItemsEquiped />
                </div>
            </div>)
            :
            (<div className="flex items-center justify-center w-full h-7/8">
                <button
                onClick={() => setShowModal(true)}
                className="pixel-corner-button flex px-3 py-2 bg-green-600 font-bold text-white items-center hover:text-neutral-700 transition-all"
                style={{ "--pixel-bg": "#2D304F", "--pixel-hover-bg": "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
                > 
                Crear Personaje
                </button>
                {showModal && <ModalCharacterCreation onClose={() => setShowModal(false)} /> }
            </div>)
        }
        </>
    )
}

export default Character;
