import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { initialData } from '../../data';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    boards: initialData,
    activeBoard: initialData.filter(board => board.isActive)[0],
  },
  reducers: {
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.map(board => {
        if (board.id === action.payload) {
          state.activeBoard = { ...board, isActive: true };
          return { ...board, isActive: true };
        } else {
          return { ...board, isActive: false };
        }
      });
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
