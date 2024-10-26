import { configureStore } from '@reduxjs/toolkit';
import { ThemeReducer } from 'src/features/ThemeToggle';
import { ModalReducer } from 'src/entities/ModalSlice';
import { BoardsReducer } from 'src/entities/BoardsSlice';
import { boardsServiceRTK } from 'src/shared/lib';

const rootReducers = {
  theme: ThemeReducer,
  modal: ModalReducer,
  boards: BoardsReducer,
  [boardsServiceRTK.reducerPath]: boardsServiceRTK.reducer,
};

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardsServiceRTK.middleware),
});
