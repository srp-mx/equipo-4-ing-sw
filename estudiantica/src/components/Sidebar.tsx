import Decoracion from "@/assets/img/decoracion.png";
import decoracionMin from "@/assets/img/decoracion-min.png"
import { Link } from "react-router-dom";

import { navItems } from "@/constants";

export const Sidebar = ({ incomplete }: { incomplete?: boolean }) => {
    return (
        <div
            className="flex justify-around md:flex-col md:row-span-4 md:ml-4 mt-2 mb-3 md:mt-6 md:mb-6 text-white text-3xl items-center space-x-1 md:space-y-4"
        >
            <img src={incomplete? decoracionMin : Decoracion} className="hidden lg:block"/>
            {
                navItems.map(element => 
                    <Link to={element.link}
                        className={`pixel-corner-button bg-[${element.color}] ${!incomplete && "md:w-full"} flex items-center text-center md:h-1/4 p-3 lg:p-4 transition hover:-translate-y-1 hover:scale-100 group`}
                        style={element.style}
                    >
                        <img src={element.img} className={`w-8 h-8 md:w-10 md:h-10 ${!incomplete && "md:mr-4 md:ml-4"}`} />
                        { !incomplete && <label className="hidden md:block lg:text-xl">{element.label}</label>} 
                    </Link>
                )
            }
            <img src={incomplete? decoracionMin : Decoracion} className="hidden lg:block"/>
        </div>
    );
}

export default Sidebar;
