import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  accessToken: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    login(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { login } = authSlice.actions;

export const authReducer = authSlice.reducer;
