import {Menu, X} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/Logo.png";
import '../index.css'
import { navItems } from "../constants";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    
    const toggleNavBar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };
    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b
        border-neutral-700 opacity-80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0 left-0">
                        <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
                        <span className="text-2xl tracking-tight">Estudiantica</span>
                    </div>
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <Link to="/register" className="py-2 px-3 border rounded-md">
                            Sign up
                        </Link>
                        <Link to="/login"  className="bg-gradient-to-r from-blue-500 to-blue-800 py-2 px-3 rounded-md">
                            Log in
                        </Link>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavBar}> 
                            {mobileDrawerOpen ? <X /> : <Menu /> }
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <div className="flex space-x-6">
                            <Link to="/register" className="py-2 px-3 border rounded-md">
                                Sign up
                            </Link>
                            <Link to="/login" className="py-2 px-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-800">
                                Log in
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
