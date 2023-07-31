import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/ui-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
