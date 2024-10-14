import { lazy } from 'react';

export const AddNewBoard = lazy(() => import('./AddNewBoard'));
export const AddNewColumn = lazy(() => import('./AddNewColumn'));
export const AddNewTask = lazy(() => import('./AddNewTask'));
export const Confirm = lazy(() => import('./Confirm'));
export const EditBoard = lazy(() => import('./EditBoard'));
export const EditTask = lazy(() => import('./EditTask'));
export const ViewTask = lazy(() => import('./ViewTask'));
