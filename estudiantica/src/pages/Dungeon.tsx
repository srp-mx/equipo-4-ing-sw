import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import bgImage from '@/assets/img/background-default.jpg';


export default function Dungeon(){
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center">
            <Navbar isLoggedIn={true}/>
            <div className="grid grid-cols-10 grid-rows-4 gap-2 h-17/20 w-full">
                <Sidebar incomplete={true}/>

                <div 
                className="col-span-9 row-span-4 h-full p-4 ml-2 mr-6 rounded-2xl"
                style ={{ backgroundImage: `url(${bgImage}) `, backgroundSize: 'cover' }}>
                    <h1 className="title-section text-[60px]">
                        Mazmorras
                    </h1>
                </div>
            </div>
        </div>
    );
}