import { RachaCharacter } from "@/Object/Character";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RachaState {
    racha : RachaCharacter;
}

const initialState : RachaState = {
    racha : {
        alive : false,
        next_check: "", 
        timers: {
            streak_loss: "",
            deletion: "",
            next_heal: "",
        } ,
    }
}

const RachaSlice = createSlice({
    name: 'racha', 
    initialState, 
    reducers: {
        setRacha(state, action: PayloadAction<RachaCharacter>){
            state.racha = action.payload;
        },
        clearRacha(state){
            state.racha = initialState.racha;
        }
    }
});

export const {setRacha, clearRacha } = RachaSlice.actions; 
export default RachaSlice.reducer;