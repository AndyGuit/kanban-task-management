import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';

const initialState = {
  isVisible: false,
  formContent: ModalContent.none,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.isVisible = true;
    },
    hideModal: (state) => {
      state.isVisible = false;
    },
    setModalContent: (state, action: PayloadAction<ModalContent>) => {
      state.formContent = action.payload;
    },
  },
});

export const { actions: ModalActions, reducer: ModalReducer } = modalSlice;
