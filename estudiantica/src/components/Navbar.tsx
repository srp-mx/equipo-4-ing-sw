export default function Navbar(){
    return (
        <aside className="fixed rounded-xl ml-4 fixed left-0 z-40">
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#1A1538] rounded-2xl">
            <ul className="space-y-8 text-white">
                <a href="Inicio" className="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_inicio.png" className="mr-3 duration-75"/>
                    Inicio
                </a>
                <a href="#" className="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_clanes.png" className="mr-3"/>
                    Clanes
                </a>
                <a href="#" className="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_mazmorras.png" className="mr-3"/>
                    Mazmorras
                </a>
                <a href="#" className="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_otros.png" className="mr-3"/>
                    Otros
                </a>
                <a href="#" className="flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                    <img src="assets/img/sidebar/icono_configuración.png" className="mr-3"/>
                    Configuración
                </a>    
            </ul>
        </div>
    </aside>
    );
}