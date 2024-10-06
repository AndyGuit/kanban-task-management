import { RootState } from '../config/store';

export const getIsHasSidebar = (state: RootState) => state.ui.hasSidebar;

export const getModalFormContent = (state: RootState) => state.ui.modal.formContent;

export const getIsModal = (state: RootState) => state.ui.modal.isVisible;
