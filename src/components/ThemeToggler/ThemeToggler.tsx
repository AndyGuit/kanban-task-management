import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { uiActions } from '../../store/slices/ui-slice';
import { IconMoon, IconSun } from '../Icons/Icons';
import Button from '../UI/Button';
import classes from './ThemeToggler.module.scss';

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.appTheme);
  const [isDark, setIsDark] = useState(theme === 'dark');

  const toggleBtnStyles = `${classes['button-toggle']} ${
    isDark ? '' : classes['active']
  }`;

  const toggleTheme = () => {
    dispatch(uiActions.toggleAppTheme());
    setIsDark(prevState => !prevState);
  };

  return (
    <div className={`theme-toggler ${classes['theme-toggler']}`}>
      <IconMoon />
      <Button onClick={toggleTheme} classes={toggleBtnStyles}>
        <span></span>
      </Button>
      <IconSun />
    </div>
  );
};

export default ThemeToggler;
