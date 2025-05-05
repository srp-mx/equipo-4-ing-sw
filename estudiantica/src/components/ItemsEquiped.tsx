import { itemEquiped } from "@/constants";
import { clearArmor, clearItemEquiped, clearPet, clearWeapon, setArmor, setPet, setWeapon } from "@/constants/dataCharacterSlice";
import { Armor, Pet, Weapon } from "@/Object/Items";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalArmor from "./Items/ModalArmor";
import ModalPet from "./Items/ModalPet";
import { RootState } from "@/constants/store";
import { CircleOff } from "lucide-react";
import ModalWeapon from "./Items/ModalWeapon";

const getPetEquiped = async (dispatch:any) => {
    try{
        const response = await fetch("http://localhost:3000/get_character_accompanies", {
            method: "GET", 
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if(!response.ok){
            switch(response.status){
                case 400: 
                    throw new Error(`Error 400 (Bad request): ${response.body}`);
                case 401: 
                    throw new Error(`Error 401 (Unauthorized) ${response.body}`);
                case 500: 
                    throw new Error(`Error 500 (Internal Server Error) ${response.body}`);
            }
        }
        const data = await response.json();
        const pet : Pet = data.pet;
        if(pet === null) dispatch(clearPet());
        else
            dispatch(setPet(pet));
    }catch(error){
        console.error(error);
    }
}
const getArmorEquiped = async (dispatch: any) => {
    try{
        const response = await fetch("http://localhost:3000/get_character_wears", {
             method: "GET", 
             headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"), 
                "Content-Type": "application/json"
             }
        })
        if(!response.ok){
            switch(response.status){
                case 400: 
                    throw new Error(`Error 400 (Bad request): ${response.body}`);
                case 401: 
                    throw new Error(`Error 401 (Unauthorized) ${response.body}`);
                case 500: 
                    throw new Error(`Error 500 (Internal Server Error) ${response.body}`);
        }
        const data = await response.json(); 
        const armor : Armor = data.armor;
        if(armor === null) dispatch(clearArmor());
        else 
        dispatch(setArmor(armor));
        }
    }catch(error){
        console.error(error);
    }
}
const getWeaponEquiped = async (dispatch:any) => {
    try{
        const response = await fetch("http://localhost:3000/get_character_equips", {
             method: "GET", 
             headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"), 
                "Content-Type": "application/json"
             }
        })
        if(!response.ok){
            switch(response.status){
                case 400: 
                    throw new Error(`Error 400 (Bad request): ${response.body}`);
                case 401: 
                    throw new Error(`Error 401 (Unauthorized) ${response.body}`);
                case 500: 
                    throw new Error(`Error 500 (Internal Server Error) ${response.body}`);
        }
        const data = await response.json(); 
        const weapon : Weapon = data.weapon;
        if(weapon === null) dispatch(clearWeapon());
        else
        dispatch(setWeapon(weapon));
        }
    }catch(error){
        console.error(error);
    }
}

const ItemsEquiped = () => {
    /*return (
=======
    const [modalArmor, setModalArmor] = useState(false);
    const [modalWeapon, setModalWeapon] = useState(false); 
    const [modalPet, setModalPet] = useState(false);
    const dispatch = useDispatch();
    const itemEquiped = useSelector((state: RootState) => state.dataCharacter.itemEquiped);
    useEffect(() => {
        const getEquiped = async () => {
            await getArmorEquiped(dispatch); 
            await getPetEquiped(dispatch);
            await getWeaponEquiped(dispatch);
        } 
        getEquiped();
    }, [dispatch])

    return (
>>>>>>> 3d62cd6 (Modal Armor without hover)
        <>
            <button className="bg-gray-900 m-2 rounded-xl h-1/2 w-6/10 flex flex-col justify-center items-center text-center ml-4" 
            onClick={() => setModalArmor(true)}
            >
                {itemEquiped.armor.id === 0 ? 
                    <CircleOff color="black" className="w-4/5 h-4/5" />
                : 
                <img src={itemEquiped.armor.image_uri} alt="armadura" />
                }
            </button>
            <button className="bg-gray-900 m-2 rounded-xl h-1/2 w-6/10 flex items-center justify-center text-center ml-4" 
            onClick={() => setModalWeapon(true)}
            >
                {itemEquiped.weapon.id === 0 ? 
                    <CircleOff color="black" className="w-4/5 h-4/5" />
                : 
                <img src={itemEquiped.weapon.image_uri} alt="arma" />
                }
            </button>
            <button className="bg-gray-900 m-2 rounded-xl h-1/2 w-6/10 flex justify-center items-center text-center ml-4" 
            onClick={() => setModalPet(true)}
            >
                {0 === 0 ? 
                    <CircleOff color="black" className="w-4/5 h-4/5" />
                : 
                <img src={itemEquiped.pet.image_uri} alt="mascota" />
                }
            </button>
        {modalArmor && <ModalArmor onClose={() => setModalArmor(false)} />}
        {modalPet && <ModalPet onClose={() => setModalPet(false)} />}
        {modalWeapon && <ModalWeapon onClose={() => setModalWeapon(false)}  />}
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
