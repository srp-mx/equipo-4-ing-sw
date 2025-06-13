import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import bgImage from '@/assets/img/background-default.jpg';

export default function Credits (){

    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center overflow-hidden">
            <Navbar isLoggedIn={true}/>
            <div className="flex flex-col-reverse md:grid md:grid-cols-10 md:grid-rows-4 h-[calc(100vh-64px)] w-full">
                <Sidebar incomplete={true}/>

                <div 
                className="md:col-span-9 md:row-span-4 md:mr-6 h-full p-4 mx-4 rounded-2xl overflow-y-auto"
                style ={{ backgroundImage: `url(${bgImage}) `, backgroundSize: 'cover' }}>
                    <h1 className="title-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        Creditos
                    </h1>
                    <p className="pt-10 pl-10 pr-10 text-2xl text-white">
                        Algunos de los iconos fueron proporcionados por Lucide (https://lucide.dev) bajo licencia Apache 2.0
                    </p>
                </div>
                

            </div>
        </div>
    );
}