import Header from "@/components/Header";
import Navbar from "@/components/home/Navbar";
import SearchbarWorks from "@/components/SearchbarWorks";
//import SideBar from "@/components/SideBar";
import { useAuth } from "@/constants";
import Calendar from "@/components/CalendarView/Calendar"

export default function CalendarPage(){
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center">
            <Navbar/>
            <div className="p-4 sm:ml-56 bg-[url(/assets/img/login_bg.jpg)] sm:mr-4 rounded-2xl h-17/20">
                <Calendar/>                      
            </div>                                                             
        </div>
    );
}