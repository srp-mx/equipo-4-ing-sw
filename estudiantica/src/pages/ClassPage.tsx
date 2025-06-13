import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import SearchbarClass from "@/components/SearchbarClass";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/constants";
import bgImage from '@/assets/img/background-default.jpg';

export default function ClassPage(){

    useAuth();

    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center overflow-hidden">
            <Navbar isLoggedIn={true}/>
            <div className="flex flex-col-reverse md:grid md:grid-cols-10 md:grid-rows-4 h-[calc(100vh-64px)] w-full">
                <Sidebar incomplete={true}/>
                <div 
                className="md:col-span-9 md:row-span-4 md:mr-6 h-full p-4 mx-4 rounded-2xl flex flex-col overflow-y-auto"
                style ={{ backgroundImage: `url(${bgImage}) `, backgroundSize: 'cover' }}>
                    <h1 className="title-section text-[30px] sm:text-[40px] md:text-[60px]">
                        Clases
                    </h1>
                    <SearchbarClass/>
                </div>
            </div>
        </div>
    );
}