import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import itemSlice from './item-slice';
import authSlice from './auth-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    items: itemSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
