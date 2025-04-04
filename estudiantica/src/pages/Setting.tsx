import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import SettingsPage from "@/components/settings/SettingsPage";

export default function Settings(){
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center">
            <Navbar isLoggedIn={true}/>
            <SideBar/>
            <div className="p-4 sm:ml-56 bg-[url(assets/img/login_bg.jpg)] sm:mr-4 rounded-2xl h-17/20">
                <h1 className="title-section text-[60px]">Configuración</h1>

                <div className="overflow-y-auto justify-center items-center h-5/6">
                    <SettingsPage />
                </div>
            </div>
        </div>
    );
}

