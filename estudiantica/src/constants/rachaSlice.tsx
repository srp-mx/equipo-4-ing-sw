import { RachaCharacter } from "@/Object/Character";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RachaState {
    racha : RachaCharacter;
}

const initialState : RachaState = {
    racha : {
        alive : false,
        next_check: Number.MAX_VALUE, 
        timers: {
            streak_loss: Number.MAX_VALUE,
            deletion: Number.MAX_VALUE,
            next_heal: Number.MAX_VALUE,
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