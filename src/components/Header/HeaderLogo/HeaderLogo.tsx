import { IconLogo } from '../../Icons/Props';
import classes from './HeaderLogo.module.scss';

const HeaderLogo = () => {
  return (
    <div className={`header-logo ${classes['header-logo']}`}>
      <IconLogo />
      <h1>kanban</h1>
    </div>
  );
};

export default HeaderLogo;
