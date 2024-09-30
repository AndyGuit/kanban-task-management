import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';
import {
  loadFromLocalStorage,
  LocalStorageKeys,
  saveToLocalStorage,
} from '../../../../shared/lib/functions/localStorage';
import { UIStateSchema } from '../types/StateSchema';
import { AppTheme } from '../../../../shared/types/appThemes';

const initialState = loadFromLocalStorage<UIStateSchema>(LocalStorageKeys.UI);

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleAppTheme: (state) => {
      state.appTheme = state.appTheme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;

      saveToLocalStorage<UIStateSchema>(LocalStorageKeys.UI, {
        ...state,
        modal: { isVisible: false, formContent: ModalContent.none },
      });
    },
    toggleSidebar: (state) => {
      state.hasSidebar = !state.hasSidebar;

      saveToLocalStorage<UIStateSchema>(LocalStorageKeys.UI, {
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
