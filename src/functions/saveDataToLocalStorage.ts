import { initialData } from '../data';
import { IBoard } from '../types/dataTypes';

const localStorageData = 'kanban/data';

export const loadDataFromLocalStorage: () => IBoard[] = () => {
  try {
    const state = localStorage.getItem(localStorageData);
    if (!state) {
      return initialData as IBoard[];
    }
    return JSON.parse(state);
  } catch (err) {
    return null;
  }
};

export const saveStateToLocalStorage = (state: IBoard[]) => {
  try {
    const items = JSON.stringify(state);
    localStorage.setItem(localStorageData, items);
  } catch (err) {
    console.log(err);
  }
};
