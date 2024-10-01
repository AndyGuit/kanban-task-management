import HeaderBoardInfo from '../../components/Header/HeaderBoardInfo/HeaderBoardInfo';
import HeaderLogo from '../../components/Header/HeaderLogo/HeaderLogo';
import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className={`header ${classes.header}`}>
      <HeaderLogo />
      <HeaderBoardInfo />
    </header>
  );
};

export default Header;
