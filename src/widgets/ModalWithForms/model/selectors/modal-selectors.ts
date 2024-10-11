import { RootState } from 'src/app/providers/StoreProvider/config/store';

export const getModalFormContent = (state: RootState) =>
  state.modal.formContent;

export const getIsModal = (state: RootState) => state.modal.isVisible;
