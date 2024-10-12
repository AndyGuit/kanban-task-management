import { configureStore } from '@reduxjs/toolkit';
import { UIReducer } from '../slices/ui-slice';
import { DataReducer } from '../slices/data-slice';
import { ThemeReducer } from 'src/features/ThemeToggle/model/slices/theme-slice';
import { ModalReducer } from 'src/widgets/ModalWithForms';

const rootReducers = {
  ui: UIReducer,
  data: DataReducer,
  theme: ThemeReducer,
  modal: ModalReducer,
};

const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
