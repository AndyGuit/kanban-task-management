import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../../functions/saveToLocalStorage';
import { ModalContent } from '../../types/modalFormContentTypes';

export interface IUIState {
  appTheme: 'dark' | 'light';
  hasSidebar: boolean;
  modal: {
    isVisible: boolean;
    formContent: ModalContent;
  };
}

const initialState = loadFromLocalStorage<IUIState>('kanban/ui');

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleAppTheme: (state) => {
      state.appTheme = state.appTheme === 'dark' ? 'light' : 'dark';

      saveToLocalStorage<IUIState>('kanban/ui', {
        ...state,
        modal: { isVisible: false, formContent: ModalContent.none },
      });
    },
    toggleSidebar: (state) => {
      state.hasSidebar = !state.hasSidebar;

      saveToLocalStorage<IUIState>('kanban/ui', {
        ...state,
        modal: { isVisible: false, formContent: ModalContent.none },
      });
    },
    showModal: (state) => {
      state.modal.isVisible = true;
    },
    hideModal: (state) => {
      state.modal.isVisible = false;
    },
    setModalContent: (state, action: PayloadAction<ModalContent>) => {
      state.modal.formContent = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
