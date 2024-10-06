import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../shared/ui/Button/buttonStyles';
import { IconMoon, IconSun } from '../../../shared/ui/Icons/Icons';
import classes from './ThemeToggle.module.scss';
import { getTheme } from '../model/selectors/get-theme';
import { AppTheme } from '../../../shared/types/appThemes';
import { ThemeActions } from '../model/slices/theme-slice';

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
      <IconMoon />
      <Button onClick={toggleTheme} styleClass={ButtonStyle.TOGGLE} isActive={!isDark}>
        <span></span>
      </Button>
      <IconSun />
    </div>
  );
};
