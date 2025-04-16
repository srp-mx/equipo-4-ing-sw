import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Assigment } from '@/Object/Assigment';

interface AssignmentState {
    assignments : Assigment[];
};

const initialState : AssignmentState = {
    assignments: []
};

const assignmentSlice = createSlice({
    name: 'assignments', 
    initialState, 
    reducers: {
        setAssignments(state, action: PayloadAction<Assigment[]>) {
            state.assignments = action.payload;
        },
        clearAssignments(state) {
            state.assignments = initialState.assignments;
        },
        removeAssignment(state, action: PayloadAction<Assigment>){
            state.assignments = state.assignments.filter(ass => ass.id !== action.payload.id);
        },
        addAssignment(state, action: PayloadAction<Assigment> ) {
            state.assignments.push(action.payload);
        },
        updateAssignment(state, action: PayloadAction<Assigment>){
            const i = state.assignments.findIndex(ass => ass.id === action.payload.id)
            if(i !== -1){
                state.assignments[i] = action.payload;
            }
        }
    },
});

export const { setAssignments, clearAssignments, removeAssignment, addAssignment, updateAssignment} = assignmentSlice.actions; 
export default assignmentSlice.reducer;