import { createSlice } from '@reduxjs/toolkit';
import { AppTheme } from '../constants/appThemes';
import { LocalStorageKeys } from 'src/shared/lib';

const localStorageTheme = localStorage.getItem(LocalStorageKeys.Theme);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: localStorageTheme || AppTheme.DARK,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme =
        state.theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;

      localStorage.setItem(LocalStorageKeys.Theme, state.theme);
    },
  },
});

export const { actions: ThemeActions, reducer: ThemeReducer } = themeSlice;
