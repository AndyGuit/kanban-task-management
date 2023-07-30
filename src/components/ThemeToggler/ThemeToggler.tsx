import { useState } from 'react';
import { IconMoon, IconSun } from '../Icons/Icons';
import Button from '../UI/Button';
import classes from './ThemeToggler.module.scss';

const ThemeToggler = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleBtnStyles = `${classes['button-toggle']} ${
    isActive ? classes['active'] : ''
  }`;

  const toggleTheme = () => setIsActive((prevState: boolean) => !prevState);

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
