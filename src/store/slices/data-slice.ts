import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage, LocalStorageKeys, saveToLocalStorage } from '../../shared/functions/localStorage';
import { IBoard, IColumn, ITask } from '../../shared/types/dataTypes';

const storedBoards = loadFromLocalStorage<IBoard[]>(LocalStorageKeys.data);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    boards: storedBoards,
    activeBoard: storedBoards.filter((board) => board.isActive)[0],
    selectedTask: {} as ITask,
    selectedColumn: {} as IColumn,
  },
  reducers: {
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.map((board) => {
        if (board.id === action.payload) {
          state.activeBoard = { ...board, isActive: true };
          return { ...board, isActive: true };
        } else {
          return { ...board, isActive: false };
        }
      });

      saveToLocalStorage<IBoard[]>(LocalStorageKeys.data, state.boards);
    },

    setSelectedTask: (state, action: PayloadAction<string>) => {
      const selectedTask = state.selectedColumn.tasks.find((task) => task.id === action.payload);

      state.selectedTask = selectedTask!;
    },

    setSelectedColumn: (state, action: PayloadAction<string>) => {
      const selectedColumn = state.activeBoard.columns.find((col) => col.id === action.payload);

      state.selectedColumn = selectedColumn!;
    },

    replaceTask: (state, action: PayloadAction<ITask>) => {
      state.selectedColumn.tasks = state.selectedColumn.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },

    toggleSubtaskStatus: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const newValue = !state.selectedTask.subtasks[index].isCompleted;
      state.selectedTask.subtasks[index].isCompleted = newValue;
    },

    insertSelectedTask: (state, action: PayloadAction<number>) => {
      state.selectedColumn.tasks.splice(action.payload, 0, state.selectedTask);
    },

    removeTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.selectedColumn.tasks.findIndex((task) => task.id === id);
      state.selectedColumn.tasks.splice(index, 1);
    },

    setNewTaskStatus: (state) => {
      const { id, name } = state.selectedColumn;
      state.selectedTask.statusId = id;
      state.selectedTask.status = name;
    },

    addTask: (state, action: PayloadAction<ITask>) => {
      state.selectedColumn.tasks.push(action.payload);
    },

    setColumns: (state, action: PayloadAction<IColumn[]>) => {
      state.activeBoard.columns = action.payload;
    },

    addBoard: (state, action: PayloadAction<IBoard>) => {
      state.boards.push(action.payload);
    },

    replaceActiveBoard: (state, action: PayloadAction<IBoard>) => {
      state.activeBoard = action.payload;
      state.boards = state.boards.map((board) => {
        if (board.id === action.payload.id) {
          return action.payload;
        } else {
          return board;
        }
      });
    },

    deleteActiveBoard: (state) => {
      state.boards = state.boards.filter((board) => !board.isActive);

      if (state.boards[0]) {
        state.boards[0].isActive = true;
      }

      state.activeBoard = state.boards[0];
    },

    saveChanges: (state, action: PayloadAction<'board' | 'column' | 'task'>) => {
      // Replace Task in Column
      if (action.payload === 'task') {
        const taskIndex = state.selectedColumn.tasks.findIndex((task) => task.id === state.selectedTask.id);
        state.selectedColumn.tasks[taskIndex] = state.selectedTask;
      }

      if (action.payload === 'task' || action.payload === 'column') {
        // Replace Column in Active board
        const colIndex = state.activeBoard.columns.findIndex((col) => col.id === state.selectedColumn.id);
        state.activeBoard.columns[colIndex] = state.selectedColumn;
      }

      // Replace Active board in boards
      const boardIndex = state.boards.findIndex((board) => board.id === state.activeBoard.id);
      state.boards[boardIndex] = state.activeBoard;

      saveToLocalStorage(LocalStorageKeys.data, state.boards);
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
