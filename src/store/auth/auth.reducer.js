import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    login(state, action) {
      const authInfo = action.payload;
      state.accessToken = authInfo.access;
      state.refreshToken = authInfo.refresh;
      state.user = authInfo.user;
      localStorage.setItem('accessToken', authInfo.access);
      localStorage.setItem('refresToken', authInfo.refresh);
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
