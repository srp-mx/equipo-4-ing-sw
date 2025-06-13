import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import bgImage from '@/assets/img/background-default.jpg';
import castle from '@/assets/img/Mazmorras/castle.png';
import forest from '@/assets/img/Mazmorras/dead forest.png';
import terrace from '@/assets/img/Mazmorras/terrace.png';
import throne from '@/assets/img/Mazmorras/throne room.png';
import ItemEquiped from "@/components/ItemsEquiped";

export default function Dungeon(){
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center overflow-hidden">
            <Navbar isLoggedIn={true}/>
            <div className="flex flex-col-reverse md:grid md:grid-cols-10 md:grid-rows-4 h-[calc(100vh-64px)] w-full">
                <Sidebar incomplete={true}/>

                <div 
                className="md:col-span-9 md:row-span-4 md:mr-6 h-full p-4 mx-4 rounded-2xl overflow-y-auto"
                style ={{ backgroundImage: `url(${bgImage}) `, backgroundSize: 'cover' }}>
                    <h1 className="title-section text-[30px] sm:text-[40px] md:text-[60px]">
                        Mazmorras
                    </h1>

                    <div className="flex flex-row pt-5 pb-5 pl-5 pr-5 gap-10 w-full h-5/6 "> 
                        <div className="pl-4 pr-4 pt-4 pb-4 flex flex-wrap items-center justify-between w-1/2 h-full bg-gray-800 rounded-4xl gap-5 overflow-y-auto">
                            <div style={{backgroundImage: `url(${castle})`, backgroundSize: 'cover'}} 
                            className="flex text-white text-2xl items-center pl-5 w-full h-1/4 bg-gray-300 rounded-2xl hover:backdrop-blur-2xl cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                                Limgrave
                            </div>
                            <div style={{backgroundImage: `url(${forest})`, backgroundSize: 'cover'}}
                            className="flex text-white text-2xl items-center pl-5 w-full h-1/4 bg-gray-300 rounded-2xl hover:backdrop-blur-2xl cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                                Cementerio Perdido
                            </div>
                            <div 
                            style={{backgroundImage: `url(${terrace})`, backgroundSize: 'cover'}}
                            className="flex text-white text-2xl items-center pl-5 w-full h-1/4 bg-gray-300 rounded-2xl hover:backdrop-blur-2xl cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                                Capital del Rey
                            </div>
                            <div style={{backgroundImage: `url(${throne})`, backgroundSize: 'cover'}} 
                            className="flex text-white text-2xl items-center pl-5 w-full h-1/4 bg-gray-300 rounded-2xl hover:backdrop-blur-2xl cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                                Templo del mal 
                            </div>

                        </div>
                        <div className="pl-4 pr-4 pt-4 pb-4 w-1/2 h-full rounded-4xl flex flex-col">
                            <div className="h-3/4 w-full bg-amber-400 pb-10"></div>
                            <div className="h-1/4 w-full gap-5 flex flex-row ">
                                <ItemEquiped />

                            </div>
                            
                        </div>

                    </div>
                </div>
                

            </div>
        </div>
    );
}