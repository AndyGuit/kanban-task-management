import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { initialData } from '../../data';
import { IBoard } from '../../types/dataTypes';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    boards: initialData,
  },
  reducers: {
    setActiveBoard: (
      state: { boards: IBoard[] },
      action: PayloadAction<string>
    ) => {
      state.boards = state.boards.map(board => {
        if (board.id === action.payload) {
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
