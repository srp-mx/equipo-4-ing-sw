import { RootState } from "@/constants/store";
import { Armor } from "@/Object/Items";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {CircleOff} from "lucide-react"    
import { clearArmor, setArmor } from "@/constants/dataCharacterSlice";
import HoverCard from "./HoverCard";

const getArmors = async () => {
    try {
        const response = await fetch("http://localhost:3000/character_armors",{
            method: "GET", 
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"), 
                "Content-Type": "application/json"
            }, 
        });
        if(!response.ok) {
            switch(response.status) {
                case 400:
                    throw new Error(`Error 400 (Bad Request): ${response.body}`);
                case 409: 
                    alert("El nombre ya ha sido tomado, elige otro");
                    throw new Error(`Error 409 (Conflict): ${response.body}`);
                case 500: 
                    throw new Error(`Error 500 (Internal Server Error): ${response.body}`);
                default:
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        }
        const data = await response.json();
        const armors : Armor[] = data.armors;
        return armors;
    }catch(error){
        console.error(error);
    }
} 

type ModalProps = {
    onClose: () => void
}

export default function ModalArmor({onClose} : ModalProps){
    const modalRef = useRef<HTMLDivElement>(null); 
    const itemEquiped = useSelector((state: RootState) => state.dataCharacter.itemEquiped)
    const [items, setItems] = useState<Array<Armor>>([{
        id:1, 
        created_at: "", 
        name: "arma 1", 
        rarity: 1, 
        description: "", 
        image_uri: "", 
        strength: 2, 
        defense: 2, 
        intelligence: 2, 
        heart: 2, 
        worn_since: "",
        damage_received: 2,
    },{
        id:2, 
        created_at: "", 
        name: "arma 1", 
        rarity: 1, 
        description: "", 
        image_uri: "", 
        strength: 2, 
        defense: 2, 
        intelligence: 2, 
        heart: 2, 
        worn_since: "",
        damage_received: 2,
    }]);

    const [isHovered, setIsHovered]  = useState(false);
    const dispatch = useDispatch();


    /*useEffect(() => {
        const fetchData = async() => {
            const armors = await getArmors();
            setItems(armors || []);
        };
        fetchData();
        setItems([{
            id:1, 
            created_at: "", 
            name: "arma 1", 
            rarity: 1, 
            description: "", 
            image_uri: "", 
            strength: 2, 
            defense: 2, 
            intelligence: 2, 
            heart: 2, 
            worn_since: "",
            damage_received: 2,
        },{
            id:2, 
            created_at: "", 
            name: "arma 1", 
            rarity: 1, 
            description: "", 
            image_uri: "", 
            strength: 2, 
            defense: 2, 
            intelligence: 2, 
            heart: 2, 
            worn_since: "",
            damage_received: 2,
        }]);
    }, [])
*/
    const closeModal = (e:React.MouseEvent<HTMLDivElement>) => {
            if(modalRef.current === e.target){
                onClose();
            }
        }
    
    return (
        <div ref={modalRef} onClick={closeModal}
            className="h-screen fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm"
        >
            <div className="pl-2 pt-2 pr-2 pb-2 grid gap-2 grid-cols-2 grid-rows-2 text-center items-center w-1/3 h-3/4 border-gray-400 rounded-lg bg-[#ffffe6] text-black">
                <div className=" rounded-xl border-2 w-full h-full border-black/80 col-start-1 col-end-2 row-start-1 row-end-2 flex justify-center items-center">
                    {(itemEquiped.armor.id === 0) ? 
                        <CircleOff color="black" className="w-4/5 h-4/5" />    
                    : 
                        <img src={itemEquiped.armor.image_uri} alt={itemEquiped.armor.name} />
                    }
                </div>
                <div className="overflow-y-auto justify-between gap-2 w-full h-full col-start-1 col-end-3 row-start-2 row-end-3 flex flex-wrap ">
                    <button 
                    onClick={() => {onClose(); dispatch(clearArmor())}}
                    className="w-1/5 h-2/5 flex items-center justify-center border-2 border-neutral-500 rounded-xl">
                        <CircleOff color="black" className="w-4/5 h-4/5"/>       
                    </button>
                    {items.map((armor) => 
                        <button 
                            onMouseEnter={() => {console.log("Entro"); setIsHovered(true)}}
                            onMouseLeave={() => setIsHovered(false)}
                            className="w-1/5 h-2/5 flex items-center justify-center border-2 border-neutral-500 rounded-xl"
                            onClick={() => {console.log(armor.name); dispatch(setArmor(armor)); onClose();}}
                            key={armor.id}
                        > 
                            <img src={armor.image_uri} alt={armor.name} className="w-4/5 h-4/5"/>
                        </button>

                        )}
                        
                </div>
                <div className=" rounded-xl w-full h-full col-start-2 col-end-3 row-start-1 row-end-2 flex flex-col text-lg wagon-font">
                    {(/*itemEquiped.armor.id === 0 */ false) ? ( 
                    <h1> No hay Armadura Equipada </h1>
                    ) :
                        <>
                        <h1> Armadura Equipada</h1>
                        <h1 className="text-neutral-800 pixelify-sans"> {itemEquiped.armor.name}</h1>
                        <div className="pixelify-sans text-sm justify-between flex flex-col text-start ml-3 text-neutral-600">
                            <p> Rareza: {itemEquiped.armor.rarity}</p>
                            <p> Fuerza: {itemEquiped.armor.strength}</p>
                            <p> Defensa: {itemEquiped.armor.defense}</p>
                            <p> Inteligencia: {itemEquiped.armor.intelligence}</p>
                            <p> Corazon: {itemEquiped.armor.heart}</p>
                            <p> Daño Recibido: {itemEquiped.armor.damage_received}</p>
                        </div>
                        </> 
                    }
                </div>
            </div>
            {isHovered && 
                <div className="w-1/6 h-1/4 bg-red-500 ">

                </div>
            }
        </div>
    )
}