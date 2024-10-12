import { RootState } from 'src/app/providers/StoreProvider/store/store';

export const getTheme = (state: RootState) => state.theme.theme;
