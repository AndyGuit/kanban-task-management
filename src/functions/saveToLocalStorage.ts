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

export const saveToLocalStorage = <T>(key: string, data: T) => {
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};

export const loadFromLocalStorage = <T>(key: string) => {
  const data = JSON.parse(localStorage.getItem(key) || '') as T;
  return data;
};
