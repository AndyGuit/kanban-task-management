import { RootState } from '../store/store';

export const getIsHasSidebar = (state: RootState) => state.ui.hasSidebar;
