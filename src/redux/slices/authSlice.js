// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: savedUser?.user || null,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
  restaurantInfo: savedUser?.restaurantInfo || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      console.log(action);
      localStorage.setItem('user', JSON.stringify(action.payload));

      if (action.payload.user?.role === 'Restaurant') {
        state.restaurantInfo = action.payload.restaurantInfo || null;
      } else {
        state.restaurantInfo = null;
      }
        
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure(state, action) {
        console.log(action);
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
