import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    appTheme: 'dark',
    hasSidebar: true,
  },
  reducers: {
    toggleAppTheme: (state: { appTheme: string }) => {
      state.appTheme = state.appTheme === 'dark' ? 'light' : 'dark';
    },
    toggleSidebar: (state: { hasSidebar: boolean }) => {
      state.hasSidebar = !state.hasSidebar;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
