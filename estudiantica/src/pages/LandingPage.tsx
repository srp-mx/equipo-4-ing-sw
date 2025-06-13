import HeroSection from "@/components/HeroSection";
import NavBar from "../components/Navbar";
import bgImage from '@/assets/img/background-default.jpg';

export default function LandingPage() {
    return(
        <div 
        className="min-h-screen mx-auto pt-0 bg-cover bg-center"
        style={{backgroundImage : `url(${bgImage})`}}>
            <NavBar isLoggedIn={false} />
           <div className="px-6">
                <HeroSection />
            </div>
        </div>
    );
}
