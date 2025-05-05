import { itemEquiped } from "@/constants";
import { setArmor, setPet, setWeapon } from "@/constants/dataCharacterSlice";
import { Armor, Pet, Weapon } from "@/Object/Items";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ModalArmor from "./Items/ModalArmor";


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
        dispatch(setWeapon(weapon));
        }
    }catch(error){
        console.error(error);
    }
}

const ItemsEquiped = () => {
    const [modalArmor, setModalArmor] = useState(false);
    const [modalWeapon, setModalWeapon] = useState(false); 
    const [modalPet, setModalPet] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const getEquiped = async () => {
            await getArmorEquiped(dispatch); 
            await getPetEquiped(dispatch);
            await getWeaponEquiped(dispatch);
        } 
        getEquiped();
    }, [dispatch])

    return (
        <>
        {itemEquiped.map((item) => (
            <button className="bg-gray-900 m-2 rounded-xl h-1/2 w-6/10 items-center text-center ml-4" 
            onClick={() => setModalArmor(true)}
            >
                <img src={item.url} alt={item.label} />
            </button>
        ))}
        {modalArmor && <ModalArmor onClose={() => setModalArmor(false)} />}
        </>
    );
}

export default ItemsEquiped;