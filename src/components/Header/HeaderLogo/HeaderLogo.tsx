import { IconLogo } from '../../Icons/Icons';
import classes from './HeaderLogo.module.scss';

const HeaderLogo = () => {
  return (
    <div className={classes['header-logo']}>
      <IconLogo />
      <h1>kanban</h1>
    </div>
  );
};

export default HeaderLogo;
