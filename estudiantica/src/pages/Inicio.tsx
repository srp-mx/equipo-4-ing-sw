import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Sidebar2 } from "@/components/Sidebar2";
import bgImage from '@/assets/img/background-default.jpg';


export default function Inicio(){
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center">
            <Navbar isLoggedIn={true}/>
            <div className="grid grid-cols-10 grid-rows-4 gap-2 h-17/20 w-full">
                <Sidebar2 incomplete={true}/>

                <div 
                className="col-span-9 row-span-4 h-full p-4 ml-2 mr-6 rounded-2xl"
                style ={{ backgroundImage: `url(${bgImage}) `, backgroundSize: 'cover' }}>
                    
                </div>
            </div>
        </div>
    );
}