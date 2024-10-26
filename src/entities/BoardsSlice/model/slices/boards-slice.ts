import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardsService } from 'src/shared/lib';

interface IBoardsSchema {
  boards: IBoard[];
  activeBoard: IBoard | null;
  selectedTask: ITask;
  selectedColumn: IColumn;
  isLoading: boolean;
  error: string;
  taskId: string;
  columnId: string;
}

const initialState: IBoardsSchema = {
  boards: [],
  activeBoard: null,
  selectedTask: {} as ITask,
  selectedColumn: {} as IColumn,
  isLoading: false,
  error: '',
  taskId: '',
  columnId: '',
};

export const fetchAllBoards = createAsyncThunk<
  IBoard[],
  void,
  { rejectValue: string }
>('boards/fetchAll', async (_, thunkApi) => {
  try {
    const boards = await BoardsService.getAllBoards();
    return thunkApi.fulfillWithValue(boards);
  } catch (error) {
    return thunkApi.rejectWithValue('Error: Failed to fetch boards.');
  }
});

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
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
    },

    setSelectedTask: (state, action: PayloadAction<string>) => {
      const selectedTask = state.selectedColumn.tasks.find(
        (task) => task.id === action.payload,
      );

      state.selectedTask = selectedTask!;
    },

    setSelectedColumn: (state, action: PayloadAction<string>) => {
      if (state.activeBoard) {
        const selectedColumn = state.activeBoard.columns.find(
          (col) => col.id === action.payload,
        );

        state.selectedColumn = selectedColumn!;
      }
    },

    replaceTask: (state, action: PayloadAction<ITask>) => {
      state.selectedColumn.tasks = state.selectedColumn.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task,
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
      const index = state.selectedColumn.tasks.findIndex(
        (task) => task.id === id,
      );
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
      if (state.activeBoard) {
        state.activeBoard.columns = action.payload;
      }
    },

    addBoard: (state, action: PayloadAction<IBoard>) => {
      state.boards.push(action.payload);
      BoardsService.addNewBoard(action.payload);
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
      if (state.activeBoard?.id) {
        BoardsService.deleteBoard(state.activeBoard.id);
      }

      if (state.boards[0]) {
        state.boards[0].isActive = true;
      }

      state.activeBoard = state.boards[0];
    },

    saveChanges: (
      state,
      action: PayloadAction<'board' | 'column' | 'task'>,
    ) => {
      // Replace Task in Column
      if (action.payload === 'task') {
        const taskIndex = state.selectedColumn.tasks.findIndex(
          (task) => task.id === state.selectedTask.id,
        );
        state.selectedColumn.tasks[taskIndex] = state.selectedTask;
      }

      if (action.payload === 'task' || action.payload === 'column') {
        if (state.activeBoard) {
          // Replace Column in Active board
          const colIndex = state.activeBoard.columns.findIndex(
            (col) => col.id === state.selectedColumn.id,
          );
          state.activeBoard.columns[colIndex] = state.selectedColumn;
        }
      }

      // Replace Active board in boards
      const boardIndex = state.boards.findIndex(
        (board) => board.id === state.activeBoard?.id,
      );
      if (boardIndex > -1 && state.activeBoard) {
        state.boards[boardIndex] = state.activeBoard;
        BoardsService.updateBoard(state.activeBoard);
      }
    },

    setTaskId: (state, action: PayloadAction<string>) => {
      state.taskId = action.payload;
    },
    setColumnId: (state, action: PayloadAction<string>) => {
      state.columnId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllBoards.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });

    builder.addCase(fetchAllBoards.rejected, (state, action) => {
      state.isLoading = false;
      /**
       * @todo
       * fix typescript issue
       */
      state.error = action.payload || 'Unknown Error';
    });

    builder.addCase(fetchAllBoards.fulfilled, (state, action) => {
      const activeBoard = action.payload.find((board) => board.isActive);
      state.boards = action.payload;
      if (activeBoard) state.activeBoard = activeBoard;
      state.isLoading = false;
      state.error = '';
    });
  },
});

export const { actions: BoardsActions, reducer: BoardsReducer } = boardsSlice;
