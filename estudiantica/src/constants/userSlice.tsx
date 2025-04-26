import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  username: string;
  email: string;
  token: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  username: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload; 
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
