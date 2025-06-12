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
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center overflow-hidden">
            <NavBar isLoggedIn={true}/>
            <div className="flex flex-col-reverse md:grid md:grid-cols-10 md:grid-rows-4 h-[calc(100vh-90px)] w-full">
                <Sidebar/>

                <div 
                className="md:col-span-6 md:row-span-4 md:col-start-3 md:mr-6 h-full p-4 mx-4 rounded-2xl flex flex-col overflow-y-auto"
                style ={{ backgroundImage: `url(${bgImage}) `, backgroundSize: 'cover' }}>
                    <Character />
                </div>
                <div className="hidden md:block md:col-span-2 md:row-span-4 md:col-start-9 md:ml-2 md:mb-2">
                    <Stats />
                </div>
            </div>
        </div>
    );
}