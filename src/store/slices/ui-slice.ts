import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalContent } from '../../types/modalFormContentTypes';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    appTheme: 'dark',
    hasSidebar: true,
    modal: {
      isVisible: false,
      formContent: ModalContent.editTask,
    },
  },
  reducers: {
    toggleAppTheme: state => {
      state.appTheme = state.appTheme === 'dark' ? 'light' : 'dark';
    },
    toggleSidebar: state => {
      state.hasSidebar = !state.hasSidebar;
    },
    showModal: state => {
      state.modal.isVisible = true;
    },
    hideModal: state => {
      state.modal.isVisible = false;
    },
    setModalContent: (state, action: PayloadAction<ModalContent>) => {
      state.modal.formContent = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
