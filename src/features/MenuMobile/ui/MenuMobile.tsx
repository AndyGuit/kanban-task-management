import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from '../../../shared/types/dataTypes';
import { ModalContent } from '../../../shared/types/modalFormContentTypes';
import { IconBoard } from '../../../shared/ui/Icons/Icons';
import Button from '../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../shared/ui/Button/buttonStyles';
import {
  DataActions,
  DataSelectors,
  UIActions,
} from '../../../app/providers/StoreProvider';
import { ThemeToggle } from '../../ThemeToggle';
import classes from './MenuMobile.module.scss';

const MenuMobile = () => {
  const dispatch = useDispatch();
  const boards = useSelector(DataSelectors.getAllBoards);

  const setActiveBoard = (boardId: string) => {
    dispatch(DataActions.setActiveBoard(boardId));
    dispatch(UIActions.hideModal());
  };
  const handleAddBoard = () => {
    dispatch(UIActions.setModalContent(ModalContent.addNewBoard));
  };

  return (
    <form className={`menu-mobile ${classes['menu-mobile']}`}>
      <nav className={`menu-mobile-nav ${classes['menu-mobile-nav']}`}>
        <h3>all boards ({boards.length})</h3>
        <ul>
          {boards.map((board: IBoard) => (
            <li key={board.id}>
              <Button
                onClick={setActiveBoard.bind(null, board.id)}
                styleClass={ButtonStyle.SELECT_BOARD}
                isActive={board.isActive}
              >
                <IconBoard /> {board.name}
              </Button>
            </li>
          ))}
          <Button
            onClick={handleAddBoard}
            styleClass={ButtonStyle.CREATE_BOARD}
          >
            <IconBoard />+ Create New Board
          </Button>
        </ul>
        <ThemeToggle />
      </nav>
    </form>
  );
};

export default MenuMobile;
