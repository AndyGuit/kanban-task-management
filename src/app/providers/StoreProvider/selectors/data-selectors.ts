import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../config/store';

export const getActiveBoard = (state: RootState) => state.data.activeBoard;
export const getActiveBoardName = (state: RootState) =>
  state.data.activeBoard.name;
export const getAllBoards = (state: RootState) => state.data.boards;

export const getColumns = (state: RootState) => state.data.activeBoard.columns;
export const getSelectedColumn = (state: RootState) =>
  state.data.selectedColumn;
export const getColumnsStatus = createSelector(getColumns, (columns) =>
  columns.map((column) => ({
    name: column.name,
    statusId: column.id,
  })),
);

export const getSelectedTask = (state: RootState) => state.data.selectedTask;

export const getCompletedSubtasksOnSelectedTask = createSelector(
  getSelectedTask,
  (selectedTask) =>
    selectedTask.subtasks.filter((subtask) => subtask.isCompleted),
);
