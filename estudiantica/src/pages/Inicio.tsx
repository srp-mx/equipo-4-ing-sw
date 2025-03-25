import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Inicio(){
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center">
            <Header/>
            <Navbar/>
            <div className="p-4 sm:ml-56 bg-[url(/assets/img/login_bg.jpg)] sm:mr-4 rounded-2xl h-17/20">
                <h1 className="title-section text-[60px]">Prueba</h1>
            </div>
        </div>
    );
}