import { DataCharacter } from "@/Object/Character";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataCharacterState {
    dataCharacter : DataCharacter;
}; 

const initialState : DataCharacterState = {
    dataCharacter: {
        id: 0, 
        user_username: '',
        name: '', 
        moment_of_last_action: '', 
        streak: 0, 
        hp: 0,
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
        }
    }
});

export const { setDataCharacter, clearDataCharacter} = dataCharacterSlice.actions; 
export default dataCharacterSlice.reducer;