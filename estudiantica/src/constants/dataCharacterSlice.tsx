import { DataCharacter } from "@/Object/Character";
import { Armor, ItemEquiped, Pet, Weapon } from "@/Object/Items";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataCharacterState {
    dataCharacter : DataCharacter;
    points: number;
    itemEquiped: ItemEquiped;
}; 

const initialState : DataCharacterState = {
    dataCharacter: {
        id: 0, 
        user_username: '',
        name: '', 
        moment_of_last_action: '', 
        streak: 0, 
        hp: 0,
    },
    points: 0,
    itemEquiped: {
        armor: {
            id: 0, 
            created_at: "",
            name: "", 
            rarity: 0, 
            description: "", 
            image_uri: "", 
            strength: 0,
            defense: 0, 
            intelligence: 0, 
            heart: 0, 
            damage_received: 0, 
            worn_since: ""
        },
        weapon: {
            id: 0, 
            created_at: "",
            name: "", 
            rarity: 0, 
            description: "", 
            image_uri: "", 
            strength: 0,
            defense: 0, 
            intelligence: 0, 
            heart: 0, 
            slay_count: 0, 
            equipped_since: ""
        }, 
        pet: {
            id: 0, 
            created_at: "",
            name: "", 
            rarity: 0, 
            description: "", 
            image_uri: "", 
            strength: 0,
            defense: 0, 
            intelligence: 0, 
            heart: 0, 
            bond: 0, 
            accompanying_since: ""
        }
    }
    
};

const dataCharacterSlice = createSlice({
    name: 'dataCharacter', 
    initialState, 
    reducers: {
        setDataCharacter(state, action: PayloadAction<DataCharacter>){
            state.dataCharacter = action.payload;
        },
        clearDataCharacter(state) {
            state.dataCharacter = initialState.dataCharacter;
            state.points = initialState.points;
            state.itemEquiped = initialState.itemEquiped;
        },
        setPoints(state, action: PayloadAction<number>){
            state.points = action.payload;
        },
        setName(state, action: PayloadAction<string>){
            state.dataCharacter.name = action.payload;
        },
        setItemEquiped(state, action:PayloadAction<ItemEquiped>){
            state.itemEquiped = action.payload;
        }, 
        setWeapon(state, action:PayloadAction<Weapon>){
            state.itemEquiped.weapon = action.payload;
        },
        setArmor(state, action: PayloadAction<Armor>) {
            state.itemEquiped.armor = action.payload;
        }, 
        setPet(state, action:PayloadAction<Pet>){
            state.itemEquiped.pet = action.payload;
        },
        clearWeapon(state){
            state.itemEquiped.weapon = initialState.itemEquiped.weapon;
        },
        clearArmor(state){
            state.itemEquiped.armor = initialState.itemEquiped.armor;
        },
        clearPet(state){
            state.itemEquiped.pet = initialState.itemEquiped.pet;
        },
        clearItemEquiped(state){
            state.itemEquiped = initialState.itemEquiped
        }
    }
});

export const { setDataCharacter, clearDataCharacter, setPoints, setName, setItemEquiped, setWeapon, setPet, setArmor, clearItemEquiped, clearArmor, clearPet, clearWeapon} = dataCharacterSlice.actions; 
export default dataCharacterSlice.reducer;