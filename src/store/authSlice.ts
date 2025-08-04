import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  role: 'admin' | 'builder' | 'accountant' | 'manager';
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setRole(state, action: PayloadAction<User['role']>) {
      if (state.user) state.user.role = action.payload;
    },
  },
});

export const { setUser, setRole } = authSlice.actions;
export default authSlice.reducer; 