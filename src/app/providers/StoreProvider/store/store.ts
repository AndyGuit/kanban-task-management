import { configureStore } from '@reduxjs/toolkit';
import { ThemeReducer } from 'src/features/ThemeToggle';
import { ModalReducer } from 'src/entities/ModalSlice';
import { BoardsReducer } from 'src/entities/BoardsSlice';

const rootReducers = {
  theme: ThemeReducer,
  modal: ModalReducer,
  boards: BoardsReducer,
};

export const store = configureStore({
  reducer: rootReducers,
});
