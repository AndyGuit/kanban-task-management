import { IconAppLogo } from '../Icons/Icons';
import classes from './AppLogo.module.scss';

export const AppLogo = () => {
  return (
    <div className={`app-logo ${classes['app-logo']}`}>
      <IconAppLogo />
      <h1>kanban</h1>
    </div>
  );
};
