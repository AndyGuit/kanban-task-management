import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  lodaUiFromLocalStorage,
  saveUiToLocalStorage,
} from '../../functions/saveToLocalStorage';
import { ModalContent } from '../../types/modalFormContentTypes';

const uiSlice = createSlice({
  name: 'ui',
  initialState: lodaUiFromLocalStorage(),
  reducers: {
    toggleAppTheme: state => {
      state.appTheme = state.appTheme === 'dark' ? 'light' : 'dark';

      saveUiToLocalStorage({
        ...state,
        modal: { isVisible: false, formContent: '' },
      });
    },
    toggleSidebar: state => {
      state.hasSidebar = !state.hasSidebar;

      saveUiToLocalStorage({
        ...state,
        modal: { isVisible: false, formContent: '' },
      });
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
