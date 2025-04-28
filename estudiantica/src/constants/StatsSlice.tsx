import { Skills, StatsCharacter } from "@/Object/Character";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatsState {
    stats : StatsCharacter;
}

const initialState : StatsState = {
    stats : {
        skills: {
            strength: 0, 
            defense: 0, 
            intelligence: 0, 
            heart: 0,
        }, 
        streak_bonus_percent: 0, 
        xp: 0, 
        level: 0, 
        level_percent: 0, 
        xp_to_next_level: 0,
    }
};

const StatsSlice = createSlice({
    name: 'stats', 
    initialState, 
    reducers: {
        setStats(state, action: PayloadAction<StatsCharacter>){
            state.stats = action.payload;
        },
        clearStats(state) {
            state.stats = initialState.stats;
        },
        setSkills(state, action: PayloadAction<Skills>){
            state.stats.skills = {
                strength: action.payload.strength, 
                defense: action.payload.defense, 
                intelligence: action.payload.intelligence, 
                heart: action.payload.heart,
            };
        }
    }
}); 

export const { setStats, clearStats,setSkills } = StatsSlice.actions; 
export default StatsSlice.reducer;