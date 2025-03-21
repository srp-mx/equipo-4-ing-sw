import HeroSection from "@/components/HeroSection";
import NavBar from "../../components/Navbar";

export default function LandingPage() {
    return(
        <>
          <NavBar />
           <div className="max-w-7xl mx-auto pt-0 px-6">
                <HeroSection />
            </div> 
        </>
    );
}
