import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../shared/ui/Button/buttonStyles';
import { IconMoon, IconSun } from '../../../shared/ui/Icons/Icons';
import { getTheme } from '../../../store/selectors/ui-selectors';
import { uiActions } from '../../../store/slices/ui-slice';
import classes from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const [isDark, setIsDark] = useState(theme === 'dark');

  const toggleTheme = () => {
    dispatch(uiActions.toggleAppTheme());
    setIsDark((prevState) => !prevState);
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
