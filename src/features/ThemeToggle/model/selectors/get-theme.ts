import { RootState } from '../../../../app/providers/StoreProvider/config/store';

export const getTheme = (state: RootState) => state.theme.theme;
