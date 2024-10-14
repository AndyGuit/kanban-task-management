import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    hasSidebar: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.hasSidebar = !state.hasSidebar;
    },
  },
});

export const { actions: UIActions, reducer: UIReducer } = uiSlice;
