import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { showCart: false, isLoading: false },
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    uiStartLoading(state) {
      state.isLoading = true;
    },
    uiFinishedLoading(state) {
      state.isLoading = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
