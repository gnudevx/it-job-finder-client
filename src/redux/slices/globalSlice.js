// redux/slices/globalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null, // string | null
  loading: false,
  notification: null, // { message, type: 'success'|'error'|'info' } | null
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload; // string
    },
    clearError(state) {
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload; // boolean
    },
    setNotification(state, action) {
      state.notification = action.payload; // { message, type }
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { setError, clearError, setLoading, setNotification, clearNotification } =
  globalSlice.actions;

export default globalSlice.reducer;
