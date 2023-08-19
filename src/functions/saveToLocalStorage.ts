import { initialData } from '../store/initialStates/data';
import { initialUI } from '../store/initialStates/ui';
import { IBoard } from '../types/dataTypes';

const localStorageData = 'kanban/data';
const localStorageUI = 'kanban/ui';

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

export const saveDataToLocalStorage = (state: IBoard[]) => {
  try {
    const items = JSON.stringify(state);
    localStorage.setItem(localStorageData, items);
  } catch (err) {
    console.log(err);
  }
};

export const saveUiToLocalStorage = (state: typeof initialUI) => {
  try {
    const items = JSON.stringify(state);
    localStorage.setItem(localStorageUI, items);
  } catch (err) {
    console.log(err);
  }
};

export const lodaUiFromLocalStorage = () => {
  try {
    const state = localStorage.getItem(localStorageUI);
    if (!state) {
      return initialUI;
    }
    return JSON.parse(state);
  } catch (err) {
    return null;
  }
};
