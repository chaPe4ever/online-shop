import { LocalStorageService } from '@/services/LocalStorageService';
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
  isLoading: undefined,
  errorMsg: undefined,
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
      LocalStorageService.setAccessToken(authInfo.access);
      LocalStorageService.setRefreshToken(authInfo.refresh);
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      LocalStorageService.clearAuthTokens();
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setErrorMsg(state, action) {
      state.errorMsg = action.payload;
    },
  },
});

export const { login, logout, setUser, setIsLoading, setErrorMsg } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
