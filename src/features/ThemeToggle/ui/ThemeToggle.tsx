import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../shared/ui/Button/buttonStyles';
import { IconMoon, IconSun } from '../../../shared/ui/Icons/Icons';
import classes from './ThemeToggle.module.scss';
import { UIActions, UISelectors } from '../../../app/providers/StoreProvider';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(UISelectors.getTheme);
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    dispatch(UIActions.toggleAppTheme());
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
