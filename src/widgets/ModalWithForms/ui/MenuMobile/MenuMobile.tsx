import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from 'src/shared/types';
import { ModalContent } from 'src/shared/lib';
import { ButtonStyle, Button, Icons } from 'src/shared/ui';
import { DataActions, DataSelectors } from 'src/app/providers';
import { ThemeToggle } from 'src/features/ThemeToggle';
import { ModalActions } from 'src/widgets/ModalWithForms';
import classes from './MenuMobile.module.scss';

const MenuMobile = () => {
  const dispatch = useDispatch();
  const boards = useSelector(DataSelectors.getAllBoards);

  const setActiveBoard = (boardId: string) => {
    dispatch(DataActions.setActiveBoard(boardId));
    dispatch(ModalActions.hideModal());
  };
  const handleAddBoard = () => {
    dispatch(ModalActions.setModalContent(ModalContent.addNewBoard));
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
                <Icons.Board /> {board.name}
              </Button>
            </li>
          ))}
          <Button
            onClick={handleAddBoard}
            styleClass={ButtonStyle.CREATE_BOARD}
          >
            <Icons.Board />+ Create New Board
          </Button>
        </ul>
        <ThemeToggle />
      </nav>
    </form>
  );
};

export default MenuMobile;
