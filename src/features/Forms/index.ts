import { lazy } from 'react';

export const AddNewBoard = lazy(() => import('./ui/AddNewBoard'));
export const AddNewColumn = lazy(() => import('./ui/AddNewColumn'));
export const AddNewTask = lazy(() => import('./ui/AddNewTask'));
export const Confirm = lazy(() => import('./ui/Confirm'));
export const EditBoard = lazy(() => import('./ui/EditBoard'));
export const EditTask = lazy(() => import('./ui/EditTask'));
export const ViewTask = lazy(() => import('./ui/ViewTask'));
