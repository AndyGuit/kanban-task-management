import { RootState } from 'src/app/providers';

export const getTheme = (state: RootState) => state.theme.theme;
