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
import Stats, { getPointSkill } from "./Character/Stats";
import EditModal from '@/components/Character/EditModal'
import ItemsEquiped from "./ItemsEquiped";
import rachaIcon from "@/assets/img/racha.png";
import { useIsMobile } from "@/constants/utils/useIsMobile";
import iconouser from "@/assets/img/icono_user.svg";



export const getRefresh = async (dispatch: any) => {
    try {
        const response = await fetch("http://localhost:3000/character_next_refresh", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        if (!response.ok)
            throw new Error(`Error: ${response.status} ${response.statusText} ${response.body}`)

        console.log("Ya hice refresh del timer");
        const data = await response.json();
        const rachaCharacter: RachaCharacter = data;
        dispatch(setRacha(rachaCharacter));
    } catch (error) {
        console.error("Error ", error);
    }
}


export const getStats = async (dispatch: any) => {
    try {
        const response = await fetch("http://localhost:3000/character_stats", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const character: StatsCharacter = data.stats;
        dispatch(setStats(character));

    } catch (error) {
        console.error("Error ", error);
    }
}

export const getCharacterDefaultInfo = async (dispatch: any) => {
    try {
        const response = await fetch("http://localhost:3000/character_basic_data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const character: DataCharacter = data.data;
        dispatch(setAlive(data.alive));
        dispatch(setDataCharacter(character));

    } catch (error) {
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
    const [viewStats, setViewStats] = useState(false);
    const isMobile = useIsMobile();
    const [iconoUser, setIconoUser] = useState<string>(iconouser);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await fetch("http://localhost:3000/get_pfp", 
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username: user.name })
                });

                if (!response.ok) {
                    throw new Error("No se pudo obtener la imagen");
                }
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setIconoUser(imageUrl);
            } catch (error) {
                console.error("Error al cargar la imagen del usuario", error);
            }
        };

        fetchImageUrl();
    }, []);

    useEffect(() => {
        if (isMobile) {
            setViewStats(false);
        }
    }, [isMobile]);

    return (
        <>
            {rachaRefresh.racha.alive ?
                (<div className="grid grid-cols-4 grid-rows-4 gap-2 h-15/16 md:h-7/8 w-full">
                    <div className="col-span-2 row-span-4 sm:col-span-3 sm:row-span-4 ">
                        <div className="h-1/15 text-left justify-center">
                            <div className="title-section text-start text-[30px] sm:text-[40px] lg:text-[60px] mt-3 ml-8">
                                {user.name || "Nombre de Usuario"}
                            </div>
                            <div className="text-start text-[30px] sm:text-[40px] lg:text-[60px] text-red-400 ml-8">
                                <img src={rachaIcon} alt="" className="h-6 w-6 sm:w-10 sm:h-10 inline-block mr-2" />
                                {datacharacter.dataCharacter.streak}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-30/32 md:h-full space-y-2 md:space-y-0">
                            <img src={characterDates.characterURL} alt="" className="h-7/12 sm:h-2/3 mb-5" />
                            <button onClick={() => setShowModalEdit(true)}
                                className={`pixel-corner-button py-2 px-3 border transition-all bg-[#cbda3d] text-sm sm:text-base`}
                                style={{ "--pixel-bg": "#2D304F", "--pixel-hover-bg": "#FFFFFF", "--size-pixel": "10px" } as React.CSSProperties}
                            >Editar</button>

                            <button onClick={() => setViewStats(!viewStats)}
                                className="block md:hidden pixel-corner-button py-2 px-3 border transition-all bg-[#cbda3d] text-sm sm:text-base"
                                style={{ "--pixel-bg": "#2D304F", "--pixel-hover-bg": "#FFFFFF", "--size-pixel": "10px" } as React.CSSProperties}
                            >{`Ver ${!viewStats ? 'Stats' : 'Items'}`}</button>
                            {showModalEdit && <EditModal onClose={() => setShowModalEdit(false)} />}
                        </div>
                    </div>
                    <div className="flex-col flex items-center col-span-2 row-span-4 col-start-3 sm:row-span-4 sm:col-start-4">
                        <div className="relative mb-2 w-auto h-auto">
                            <img
                                src={Bandera}
                                alt="Bandera"
                                className="w-30 object-cover"
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-17 h-17 sm:w-19 sm:h-19 rounded-full overflow-hidden p-2 bg-white/80">
                                    <img
                                        src={iconoUser}
                                        alt="Usuario"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        {viewStats ? <Stats /> : <ItemsEquiped />}
                    </div>
                </div>)
                :
                (<div className="flex items-center justify-center w-full h-7/8">
                    <button
                        onClick={() => setShowModal(true)}
                        className="pixel-corner-button flex px-3 py-2 bg-green-600 font-bold text-white items-center hover:text-neutral-700 transition-all"
                        style={{ "--pixel-bg": "#2D304F", "--pixel-hover-bg": "#FFFFFF", "--size-pixel": "10px" } as React.CSSProperties}
                    >
                        Crear Personaje
                    </button>
                    {showModal && <ModalCharacterCreation onClose={() => setShowModal(false)} />}
                </div>)
            }
        </>
    )
}

export default Character;
