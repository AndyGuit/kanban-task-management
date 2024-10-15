import { configureStore } from '@reduxjs/toolkit';
import { ThemeReducer } from 'src/features/ThemeToggle';
import { ModalReducer } from 'src/widgets/ModalWithForms';
import { BoardsReducer } from 'src/pages/Kanban/Board';

const rootReducers = {
  theme: ThemeReducer,
  modal: ModalReducer,
  boards: BoardsReducer,
};

export const store = configureStore({
  reducer: rootReducers,
});
