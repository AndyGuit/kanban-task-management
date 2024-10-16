import { createSelector } from '@reduxjs/toolkit';

export const getActiveBoard = (state: RootState) => state.boards.activeBoard;
export const getActiveBoardName = (state: RootState) =>
  state.boards.activeBoard.name;
export const getAllBoards = (state: RootState) => state.boards.boards;

export const getColumns = (state: RootState) =>
  state.boards.activeBoard.columns;
export const getSelectedColumn = (state: RootState) =>
  state.boards.selectedColumn;
export const getColumnsStatus = createSelector(getColumns, (columns) =>
  columns.map((column) => ({
    name: column.name,
    statusId: column.id,
  })),
);

export const getSelectedTask = (state: RootState) => state.boards.selectedTask;

export const getCompletedSubtasksOnSelectedTask = createSelector(
  getSelectedTask,
  (selectedTask) =>
    selectedTask.subtasks.filter((subtask) => subtask.isCompleted),
);
