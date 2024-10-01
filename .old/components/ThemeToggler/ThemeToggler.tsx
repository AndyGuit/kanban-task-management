import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/selectors/ui-selectors';
import { uiActions } from '../../store/slices/ui-slice';
import { IconMoon, IconSun } from '../../shared/ui/Icons/Icons';
import Button from '../../shared/ui/Button/Button';
import classes from './ThemeToggler.module.scss';
import { ButtonStyle } from '../../shared/ui/Button/buttonStyles';

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const [isDark, setIsDark] = useState(theme === 'dark');

  const toggleTheme = () => {
    dispatch(uiActions.toggleAppTheme());
    setIsDark((prevState) => !prevState);
  };

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

export default ThemeToggler;
