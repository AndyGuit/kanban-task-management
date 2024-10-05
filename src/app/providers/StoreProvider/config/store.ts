import { configureStore } from '@reduxjs/toolkit';
import { UIReducer } from '../slices/ui-slice';
import { DataReducer } from '../slices/data-slice';
import { ThemeReducer } from '../../../../features/ThemeToggle/model/slices/theme-slice';

const rootReducers = {
  ui: UIReducer,
  data: DataReducer,
  theme: ThemeReducer,
};

const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
