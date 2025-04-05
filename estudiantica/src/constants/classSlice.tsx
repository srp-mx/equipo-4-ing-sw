import { Class } from '@/Object/Class';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClassState {
    clases : Class[];
};

const initialState : ClassState = {
    clases: []
};

const classSlice = createSlice({
    name: 'clases', 
    initialState, 
    reducers: {
        setClases(state, action: PayloadAction<Class[]>) {
            state.clases = action.payload;
        },
        clearClases(state) {
            state.clases = initialState.clases;
        },
        removeClass(state, action: PayloadAction<number>){
            const id = action.payload;
            state.clases = state.clases.filter(clase => clase.id !== id);
        },
        addClass(state, action: PayloadAction<Class> ) {
            state.clases.push(action.payload);
        },
        updateClass(state, action: PayloadAction<Class>){
            const i = state.clases.findIndex(clase => clase.id === action.payload.id)
            if(i !== -1){
                state.clases[i] = action.payload;
            }
        }
    },
});

export const { setClases, clearClases, removeClass, addClass, updateClass} = classSlice.actions; 
export default classSlice.reducer;