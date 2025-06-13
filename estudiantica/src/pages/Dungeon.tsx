import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import bgImage from '@/assets/img/background-default.jpg';
import castle from '@/assets/img/Mazmorras/castle.png';
import forest from '@/assets/img/Mazmorras/dead forest.png';
import terrace from '@/assets/img/Mazmorras/terrace.png';
import throne from '@/assets/img/Mazmorras/throne room.png';
import ItemEquiped from "@/components/ItemsEquiped";
import Stats from "@/components/Character/Stats";
import { useState } from "react";

export default function Dungeon(){

    const [viewAction, setViewAction] = useState(0);
    const urls = [`url(${castle})`, `url(${forest})`, `url(${terrace})`, `url(${throne})`]
    const names = ["Limsgrave", "Cementerio Perdido", "Capital del Rey", "Templo del mal"]
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center overflow-hidden">
            <Navbar isLoggedIn={true}/>
            <div className="flex flex-col-reverse md:grid md:grid-cols-10 md:grid-rows-4 h-[calc(100vh-64px)] w-full">
                <Sidebar incomplete={true}/>

                <div 
                className="md:col-span-9 md:row-span-4 md:mr-6 h-full p-4 mx-4 rounded-2xl overflow-y-auto"
                style ={{ backgroundImage: `url(${bgImage}) `, backgroundSize: 'cover' }}>
                    <h1 className="title-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        Mazmorras
                    </h1>
                    <div className="flex flex-row pt-5 pb-5 pl-5 pr-5 gap-10 w-full h-5/6 "> 
                        {viewAction === 0 ? 
                        <div className="pl-4 pr-4 pt-4 pb-4 flex flex-wrap items-center justify-between w-1/2 h-full bg-gray-800 rounded-4xl gap-5 overflow-y-auto min-w-[300px]">
                            
                            <div style={{backgroundImage: `url(${castle})`, backgroundSize: 'cover'}} 
                            onClick={() => setViewAction(1)}
                            className="flex text-white text-2xl items-center pl-5 w-full h-1/4 bg-gray-300 rounded-2xl hover:backdrop-blur-2xl cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                                Limgrave
                            </div>
                            <div style={{backgroundImage: `url(${forest})`, backgroundSize: 'cover'}}
                            onClick={() => setViewAction(2)}
                            className="flex text-white text-2xl items-center pl-5 w-full h-1/4 bg-gray-300 rounded-2xl hover:backdrop-blur-2xl cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                                Cementerio Perdido
                            </div>
                            <div
                            onClick={() => setViewAction(3)} 
                            style={{backgroundImage: `url(${terrace})`, backgroundSize: 'cover'}}
                            className="flex text-white text-2xl items-center pl-5 w-full h-1/4 bg-gray-300 rounded-2xl hover:backdrop-blur-2xl cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                                Capital del Rey
                            </div>
                            <div style={{backgroundImage: `url(${throne})`, backgroundSize: 'cover'}} 
                            onClick={() => setViewAction(4)}
                            className="flex text-white text-2xl items-center pl-5 w-full h-1/4 bg-gray-300 rounded-2xl hover:backdrop-blur-2xl cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                                Templo del mal 
                            </div>

                        </div>
                       : 
                        <div className="flex flex-col pt-4 pb-4 pl-4 pr-4 gap-5 w-1/2 h-full items-center justify-between bg-gray-800 rounded-4xl overflow-y-auto min-w-[300px]">
                            <div 
                            style={{backgroundImage: urls[viewAction-1], backgroundSize: 'cover'}}
                            className="flex text-white text-2xl items-center pl-5 w-full h-1/4 bg-gray-300 rounded-2xl">
                                {names[viewAction-1]}
                            </div>
                            <div className="bg-gray-900/80 h-3/4 w-full rounded-4xl overflow-y-auto">

                            </div>
                            <div className="flex flex-row gap-10 items-center justify-center">
                                <button onClick={() => setViewAction(0)} 
                                    className="text-2xl p-3 rounded-4xl text-white bg-green-500">
                                        Cerrar
                                    </button>
                            </div>

                        </div>
                       }
                        <div className="pl-4 pr-4 pt-4 pb-4 gap-2 w-1/2 h-full items-center flex-col rounded-4xl hidden md:flex md:gap-6 min-w-[300px] min-h-[400px] ">
                            <div className="h-3/4 w-3/4 lg:w-60 pb-5 rounded-xl">
                                <Stats/>
                            </div>
                            <div className="flex">
                                <ItemEquiped />

                            </div>
                            
                        </div>

                    </div>
                </div>
                

            </div>
        </div>
    );
}