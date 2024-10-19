import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppTheme } from '../constants/appThemes';
import { LocalStorageKeys } from 'src/shared/lib';

const localStorageTheme = localStorage.getItem(LocalStorageKeys.Theme);
const isDarkPreferred =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const defaultUserTheme = isDarkPreferred ? AppTheme.DARK : AppTheme.LIGHT;

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: localStorageTheme || defaultUserTheme,
  },
  reducers: {
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
      localStorage.setItem(LocalStorageKeys.Theme, state.theme);
    },
  },
});

export const { actions: ThemeActions, reducer: ThemeReducer } = themeSlice;
