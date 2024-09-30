import { configureStore } from '@reduxjs/toolkit';
import { UIReducer } from '../slices/ui-slice';
import { DataReducer } from '../slices/data-slice';

const rootReducers = {
  ui: UIReducer,
  data: DataReducer,
};

const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
