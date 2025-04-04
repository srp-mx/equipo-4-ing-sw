import { itemEquiped } from "@/constants";

const ItemsEquiped = () => {
    return (
        <>
        {itemEquiped.map((item) => (
            <div className="bg-gray-900 m-2 rounded-xl h-1/2 w-6/10 items-center text-center ml-4" >
                <img src={item.url} alt={item.label} />
            </div>
        ))}
        </>
    );
}

export default ItemsEquiped;