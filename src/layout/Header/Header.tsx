import { useSelector } from 'react-redux';
import HeaderBoardInfo from '../../components/Header/HeaderBoardInfo/HeaderBoardInfo';
import HeaderLogo from '../../components/Header/HeaderLogo/HeaderLogo';
import { RootState } from '../../store/index';
import classes from './Header.module.scss';

const Header = () => {
  const boards = useSelector((state: RootState) => state.data.boards);
  const activeBoardName = boards.filter(board => board.isActive)[0].name;

  return (
    <header className={`header ${classes.header}`}>
      <HeaderLogo />
      <HeaderBoardInfo boardName={activeBoardName} />
    </header>
  );
};

export default Header;
