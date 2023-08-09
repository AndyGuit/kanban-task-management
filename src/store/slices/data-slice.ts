import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { initialData } from '../../data';
import { IColumn, ITask } from '../../types/dataTypes';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    boards: initialData,
    activeBoard: initialData.filter(board => board.isActive)[0],
    modalTask: {} as ITask,
    modalColumn: {} as IColumn,
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
    setModalTask: (state, action: PayloadAction<ITask>) => {
      state.modalTask = action.payload;
    },
    setModalColumn: (state, action: PayloadAction<string>) => {
      const selectedColumn = state.activeBoard.columns.find(
        col => col.id === action.payload
      );

      if (selectedColumn) state.modalColumn = selectedColumn;
    },
    toggleSubtaskStatus: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const newValue = !state.modalTask.subtasks[index].isCompleted;
      state.modalTask.subtasks[index].isCompleted = newValue;

      // Replace Task in Column
      const taskIndex = state.modalColumn.tasks.findIndex(
        task => task.id === state.modalTask.id
      );
      state.modalColumn.tasks[taskIndex] = state.modalTask;

      // Replace Column in Active board
      const colIndex = state.activeBoard.columns.findIndex(
        col => col.id === state.modalColumn.id
      );
      state.activeBoard.columns[colIndex] = state.modalColumn;

      // Replace Active board in boards
      const boardIndex = state.boards.findIndex(
        board => board.id === state.activeBoard.id
      );
      state.boards[boardIndex] = state.activeBoard;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
