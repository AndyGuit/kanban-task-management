import { RootState } from '../config/store';

export const getIsHasSidebar = (state: RootState) => state.ui.hasSidebar;
