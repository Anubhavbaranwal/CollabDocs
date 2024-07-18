// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  loadingAuth: true,
  errors: [],
  userId: null,
  email: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingAuth: (state, action) => {
      state.loadingAuth = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  setAccessToken,
  setIsAuthenticated,
  setLoading,
  setLoadingAuth,
  setErrors,
  setUserId,
  setEmail,
} = authSlice.actions;

export default authSlice.reducer;