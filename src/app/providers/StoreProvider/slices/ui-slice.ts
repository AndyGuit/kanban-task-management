import { createSlice } from '@reduxjs/toolkit';
import {
  loadFromLocalStorage,
  LocalStorageKeys,
  saveToLocalStorage,
} from 'src/shared/lib/functions/localStorage';

const initialState = loadFromLocalStorage(LocalStorageKeys.UI) || {
  hasSidebar: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.hasSidebar = !state.hasSidebar;

      saveToLocalStorage(LocalStorageKeys.UI, {
        ...state,
      });
    },
  },
});

export const { actions: UIActions, reducer: UIReducer } = uiSlice;
