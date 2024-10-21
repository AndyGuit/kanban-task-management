import { ButtonStyle, Button, Icons } from 'src/shared/ui';
import { getTheme } from '../model/selectors/get-theme';
import { AppTheme } from '../model/constants/appThemes';
import { ThemeActions } from '../model/slices/theme-slice';
import {
  useAppDispatch,
  useAppSelector,
  usePreferredColorScheme,
} from 'src/shared/lib';
import classes from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);
  const isDark = theme === AppTheme.DARK;
  document.body.className = theme;

  const toggleTheme = () => {
    dispatch(ThemeActions.setTheme(isDark ? AppTheme.LIGHT : AppTheme.DARK));
  };

  usePreferredColorScheme(toggleTheme);

  return (
    <div className={`theme-toggler ${classes['theme-toggler']}`}>
      <Icons.Moon />
      <Button
        onClick={toggleTheme}
        styleClass={ButtonStyle.TOGGLE}
        isActive={!isDark}
      >
        <span></span>
      </Button>
      <Icons.Sun />
    </div>
  );
};
