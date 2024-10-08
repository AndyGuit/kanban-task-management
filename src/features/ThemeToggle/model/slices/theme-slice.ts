import { createSlice } from '@reduxjs/toolkit';
import { AppTheme } from '../../../../shared/types/appThemes';
import {
  loadFromLocalStorage,
  LocalStorageKeys,
  saveToLocalStorage,
} from '../../../../shared/lib/functions/localStorage';

const initialState = {
  theme: loadFromLocalStorage(LocalStorageKeys.Theme) || AppTheme.DARK,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;

      saveToLocalStorage(LocalStorageKeys.Theme, state.theme);
    },
  },
});

export const { actions: ThemeActions, reducer: ThemeReducer } = themeSlice;
