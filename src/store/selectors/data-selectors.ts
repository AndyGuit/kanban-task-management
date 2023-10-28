import { RootState } from '../index';

export const getActiveBoard = (state: RootState) => state.data.activeBoard;
export const getActiveBoardName = (state: RootState) =>
  state.data.activeBoard.name;
export const getAllBoards = (state: RootState) => state.data.boards;

export const getColumns = (state: RootState) => state.data.activeBoard.columns;
export const getSelectedColumn = (state: RootState) =>
  state.data.selectedColumn;
export const getColumnsStatus = (state: RootState) =>
  state.data.activeBoard.columns.map(col => ({
    name: col.name,
    statusId: col.id,
  }));

export const getSelectedTask = (state: RootState) => state.data.selectedTask;

export const getCompletedSubtasksOnSelectedTask = (state: RootState) =>
  state.data.selectedTask.subtasks.filter(subt => subt.isCompleted);
