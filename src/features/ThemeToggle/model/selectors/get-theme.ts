import { RootState } from 'src/app/providers/StoreProvider/config/store';

export const getTheme = (state: RootState) => state.theme.theme;
