import { configureStore } from '@reduxjs/toolkit';
import { UIReducer } from '../slices/ui-slice';
import { DataReducer } from '../slices/data-slice';
import { ThemeReducer } from 'src/features/ThemeToggle';
import { ModalReducer } from 'src/widgets/ModalWithForms';

const rootReducers = {
  ui: UIReducer,
  data: DataReducer,
  theme: ThemeReducer,
  modal: ModalReducer,
};

export const store = configureStore({
  reducer: rootReducers,
});
