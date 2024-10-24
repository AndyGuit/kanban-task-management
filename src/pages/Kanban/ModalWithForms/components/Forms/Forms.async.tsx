import { lazy } from 'react';

export const AddNewBoard = lazy(() => import('./AddNewBoardRTK'));
export const AddNewColumn = lazy(() => import('./AddNewColumnRTK'));
export const AddNewTask = lazy(() => import('./AddNewTaskRTK'));
export const Confirm = lazy(() => import('./ConfirmRTK'));
export const EditBoard = lazy(() => import('./EditBoardRTK'));
export const EditTask = lazy(() => import('./EditTask'));
export const ViewTask = lazy(() => import('./ViewTaskRTK'));
