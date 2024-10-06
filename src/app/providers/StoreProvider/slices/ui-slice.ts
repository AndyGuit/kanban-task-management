import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';
import {
  loadFromLocalStorage,
  LocalStorageKeys,
  saveToLocalStorage,
} from '../../../../shared/lib/functions/localStorage';

const initialState = loadFromLocalStorage(LocalStorageKeys.UI) || {
  hasSidebar: true,
  modal: {
    isVisible: false,
    formContent: ModalContent.none,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.hasSidebar = !state.hasSidebar;

      saveToLocalStorage(LocalStorageKeys.UI, {
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

export const { actions: UIActions, reducer: UIReducer } = uiSlice;
