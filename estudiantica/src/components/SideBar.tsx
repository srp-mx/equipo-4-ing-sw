import { navItemsCharacter } from "@/constants";

const SideBar = () => {
    return(
        <aside className="fixed rounded-xl ml-4 left-0 z-40 ">
            <div className="h-3/4 px-3 py-2 overflow-y-auto bg-[#1A1538] rounded-2xl">
                <ul className="space-y-1 text-white">
                    {navItemsCharacter.map((item) => (
                        <a href={item.href} className=" flex items-center p-2 rounded-lg transition hover:-translate-y-1 hover:scale-100 group">
                            <img src={item.imagen} className="mr-3 scale-75" />
                            {item.label}
                        </a>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default SideBar; 