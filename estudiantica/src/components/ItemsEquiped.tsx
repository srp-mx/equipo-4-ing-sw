import { itemEquiped } from "@/constants";

const ItemsEquiped = () => {
    /*return (
        <>
        {itemEquiped.map((item) => (
            <div className="bg-gray-900 m-2 rounded-xl h-1/2 w-6/10 items-center text-center ml-4" >
                <img src={item.url} alt={item.label} />
            </div>
        ))}
        </>
    );*/
    return (
        <div className="flex-col items-center text-white text-xs sm:text-sm h-2/3 ">
        {itemEquiped.map((item) => (
            <div 
                className="bg-[#152442] md:mb-2 mt-2 items-center h-15 w-15 sm:h-20 sm:w-20 rounded-xl text-center"
             >
                <img src={item.url} alt={item.label} />
            </div>
        ))}
        </div>
    )
}

export default ItemsEquiped;