import HeroSection from "@/components/HeroSection";
import NavBar from "../../components/Navbar";


export default function LandingPage() {
    return(
        <div className="bg-cover bg-center">
            <NavBar isLoggedIn={false} />
           <div className="max-w-7xl mx-auto pt-0 px-6">
                <HeroSection />
            </div>
        </div> 
    );
}
