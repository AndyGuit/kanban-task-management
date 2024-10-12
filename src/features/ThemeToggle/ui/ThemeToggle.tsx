import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonStyle, Button, Icons } from 'src/shared/ui';
import { getTheme } from '../model/selectors/get-theme';
import { AppTheme } from 'src/shared/types';
import { ThemeActions } from '../model/slices/theme-slice';
import classes from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const isDark = theme === AppTheme.DARK;

  const toggleTheme = () => {
    dispatch(ThemeActions.toggleTheme());
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
