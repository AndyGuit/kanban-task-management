import { useSelector } from 'react-redux';
import HeaderBoardInfo from '../../components/Header/HeaderBoardInfo/HeaderBoardInfo';
import HeaderLogo from '../../components/Header/HeaderLogo/HeaderLogo';
import { RootState } from '../../store/index';
import classes from './Header.module.scss';

const Header = () => {
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);

  return (
    <header className={`header ${classes.header}`}>
      <HeaderLogo />
      <HeaderBoardInfo boardName={activeBoard.name} />
    </header>
  );
};

export default Header;
