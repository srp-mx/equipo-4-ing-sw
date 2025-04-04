import { navItemsCharacter } from "@/constants";
import { Link } from 'react-router-dom'
const SideBar = () => {
    return(
        <aside className="fixed rounded-xl ml-4 left-0 z-40 ">
            <div className="h-full px-3 py-4 overflow-y-auto bg-[#1A1538] rounded-2xl">
                <ul className="space-y-8 text-white">
                    {navItemsCharacter.map((item) => (
                        <Link to={item.href} className=" flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                            <img src={item.imagen} className="mr-3" />
                            {item.label}
                        </Link>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

/**
<aside class="fixed rounded-xl ml-4 fixed left-0 z-40">
        <div class="h-full px-3 py-4 overflow-y-auto bg-[#1A1538] rounded-2xl">
            <ul class="space-y-8 text-white">
                <a href="#" class="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_inicio.png" class="mr-3 duration-75"/>
                    Inicio
                </a>
                <a href="#" class="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_clanes.png" class="mr-3"/>
                    Clanes
                </a>
                <a href="#" class="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_mazmorras.png" class="mr-3"/>
                    Mazmorras
                </a>
                <a href="#" class="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_otros.png" class="mr-3"/>
                    Otros
                </a>
                <a href="#" class="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_configuración.png" class="mr-3"/>
                    Configuración
                </a>    
            </ul>
        </div>
    </aside>


 */

export default SideBar; 
