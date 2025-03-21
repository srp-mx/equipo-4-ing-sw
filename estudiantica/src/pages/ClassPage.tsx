import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import SearchbarClass from "@/components/SearchbarClass";

export default function ClassPage(){
    return (
        <div className="bg-[#0B090F] h-screen w-screen bg-cover bg-center">
            <Header/>
            <Navbar/>
            <div className="p-4 sm:ml-56 bg-[url(/assets/img/login_bg.jpg)] sm:mr-4 rounded-2xl h-17/20">
                <h1 className="title-section text-[60px]">
                    Clases
                </h1>
                <SearchbarClass/>
            </div>
        </div>
    );
}