import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import SearchbarWorks from "@/components/SearchbarWorks";
import SideBar from "@/components/SideBar";

export default function WorkPage(){
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center">
            <Navbar isLoggedIn={true}/>
            <SideBar/>
            <div className="p-4 sm:ml-56 bg-[url(assets/img/login_bg.jpg)] sm:mr-4 rounded-2xl h-17/20">
                <h1 className="title-section text-[60px]">
                    Tareas
                </h1>
                <SearchbarWorks/>
            </div>
        </div>
    );
}
