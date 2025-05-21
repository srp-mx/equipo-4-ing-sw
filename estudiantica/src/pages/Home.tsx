import NavBar from "../components/Navbar";
import Character, { getCharacterDefaultInfo, getRefresh, getStats } from "../components/Character";
import Stats, { getPointSkill } from "@/components/Character/Stats"
import { useAuth } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/constants/store";
import { useEffect } from "react";
import bgImage from '@/assets/img/background-default.jpg';
import { Sidebar } from "@/components/Sidebar";


export default function Home(){
    useAuth();
    const dispatch = useDispatch();
    const dataCharacter = useSelector((state:RootState) => state.dataCharacter);
    const rachaRefresh = useSelector((state: RootState) => state.racha);
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
    return (
        <div className="bg-[#0B090F] items-justify h-screen w-screen bg-cover bg-center">
            <NavBar isLoggedIn={true}/>
            <div className="grid grid-cols-5 grid-rows-4 gap-2 h-17/20 w-full">
                <Sidebar/>

                <div 
                className="col-span-3 row-span-4 h-full p-4 ml-2 rounded-2xl"
                style ={{ backgroundImage: `url(${bgImage}) `, backgroundSize: 'cover' }}>
                    <Character />
                </div>
                <div className="row-span-4 col-start-5 ml-2">
                    <Stats />
                </div>
            </div>
        </div>
    );
    /*
    return (
        <>
            <NavBar />
            <div className="fixed inset-0 grid grid-cols-12 grid-rows-8 h-screen ">
                <div className="mt-5 ml-5 col-start-1 col-end-3 row-start-2 row-end-4">
                    <SideBar />
                </div>
                <div className="ml-4 mt-5 mb-6 col-start-3 col-end-10 row-start-2 row-end-9 w-full bg-gradient-to-r from-gray-800 to-blue-950 rounded-2xl">
                    <Character />
                </div>
                <div className="justify-center items-center text-center flex flex-row mt-6 
                mb-6 ml-4 w-full rounded-l-2xl col-start-1 col-end-4 row-start-6 row-end-9 py-1 space-x-1 space-y-2 bg-gray-800">
                    <ItemsEquiped />
                </div> 
                {dataCharacter.dataCharacter.name !== "" && 
                    <div className="col-start-8 col-end-10 row-start-5 row-end-8 ">
                        <Stats />
                    </div>
                }

                <div className="text-3xl items-center justify-center text-center flex mt-6 flex-col
                mb-6 ml-10 mr-10 w-5/6 col-start-10 col-end-13 row-start-2 row-end-9 py-1 space-x-1 space-y-4">
                    <Link to="/work" className="flex rounded-xl items-center text-center w-full h-1/4 px-4 py-4 bg-gradient-to-r bg-red-500 to-red-600 hover:bg-red-800 transition hover:-translate-y-1 hover:scale-100 group" >
                    <img src={TareasImg} alt="" className="w-10 h-10 mr-4" />
                    Tareas
                    </Link>
                    <Link to="/home" className="flex rounded-xl items-center text-center w-full h-1/4 px-4 py-4 bg-gradient-to-r bg-blue-500 to-blue-600 hover:bg-blue-800 transition hover:-translate-y-1 hover:scale-100 group" >
                    <img src={HorarioImg} alt="" className="w-10 h-10 mr-4" />
                    Horario
                    </Link>

                    <Link to="/class" className="flex rounded-xl items-center text-center w-full h-1/4 px-4 py-4 bg-gradient-to-r bg-green-500 to-green-600 hover:bg-green-800 transition hover:-translate-y-1 hover:scale-100 group" >
                    <img src={MateriaImg} alt="" className="w-10 h-10 mr-4" />
                    
                    Clases
                    </Link>
                    
                    <Link to="/calendar" className="flex rounded-xl items-center text-center w-full h-1/4 px-4 py-4 bg-gradient-to-r bg-amber-500 to-amber-600 hover:bg-amber-800 transition hover:-translate-y-1 hover:scale-100 group" >
                    <img src={CalendarioImg} alt="" className="w-10 h-10 mr-4" />      
                    Calendario
                    </Link>
                </div>


            </div>
                   
        </>
    );*/
}