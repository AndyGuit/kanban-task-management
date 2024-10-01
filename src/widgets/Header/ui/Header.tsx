import { AppLogo } from '../../../shared/ui/AppLogo/AppLogo';
import classes from './Header.module.scss';

export const Header = () => {
  return (
    <header className={`header ${classes.header}`}>
      <AppLogo />
    </header>
  );
};
