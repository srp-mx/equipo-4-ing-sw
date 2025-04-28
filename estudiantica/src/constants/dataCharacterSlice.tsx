import { DataCharacter } from "@/Object/Character";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataCharacterState {
    dataCharacter : DataCharacter;
    points: number;
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
        },
        setPoints(state, action: PayloadAction<number>){
            state.points = action.payload;
        },
    
    }
});

export const { setDataCharacter, clearDataCharacter, setPoints} = dataCharacterSlice.actions; 
export default dataCharacterSlice.reducer;