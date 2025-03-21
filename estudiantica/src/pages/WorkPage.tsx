import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";

export default function WorkPage(){
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center">
            <Header/>
            <Navbar/>
            <div className="p-4 sm:ml-56 bg-[url(/assets/img/login_bg.jpg)] sm:mr-4 rounded-2xl h-17/20">
                <h1 className="title-section text-[60px]">
                    Tareas
                </h1>
                <div className="space-y-4">
                    <Searchbar/>
                </div>
            </div>
        </div>
    );
}