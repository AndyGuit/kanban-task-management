import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/ui-slice';
import dataSlice from './slices/data-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    data: dataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
