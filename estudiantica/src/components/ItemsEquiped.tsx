import { itemEquiped } from "@/constants";

const ItemsEquiped = () => {
    return (
        <div className="flex flex-col text-white justify-center items-center h-2/3">
        {itemEquiped.map((item) => (
            <div 
                className="pixel-corner-button bg-[#152442] m-2 items-center h-1/4 w-2/3 text-center"
                style={{ "--pixel-bg": "#2D304F", "--pixel-hover-bg" : "#152442" ,"--size-pixel" : "10px"} as React.CSSProperties}>
                <img src={item.url} alt={item.label} />
            </div>
        ))}
        </div>
    );
}

export default ItemsEquiped;