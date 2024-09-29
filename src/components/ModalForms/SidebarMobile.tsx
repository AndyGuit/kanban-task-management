import { useDispatch, useSelector } from 'react-redux';
import { getAllBoards } from '../../store/selectors/data-selectors';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { IBoard } from '../../shared/types/dataTypes';
import { ModalContent } from '../../shared/types/modalFormContentTypes';
import { IconBoard } from '../Icons/Icons';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import Button from '../UI/Button';
import classes from './Form.module.scss';

const SidebarMobile = () => {
  const dispatch = useDispatch();
  const boards = useSelector(getAllBoards);

  const setActiveBoard = (boardId: string) => {
    dispatch(dataActions.setActiveBoard(boardId));
    dispatch(uiActions.hideModal());
  };
  const handleAddBoard = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewBoard));
  };

  return (
    <form className={`form ${classes.form}`}>
      <nav className={`form-nav ${classes['form-nav']}`}>
        <h3>all boards ({boards.length})</h3>
        <ul>
          {boards.map((board: IBoard) => (
            <li key={board.id}>
              <Button onClick={setActiveBoard.bind(null, board.id)} btnStyle="select-board" isActive={board.isActive}>
                <IconBoard /> {board.name}
              </Button>
            </li>
          ))}
          <Button onClick={handleAddBoard} btnStyle="create-board">
            <IconBoard />+ Create New Board
          </Button>
        </ul>
        <ThemeToggler />
      </nav>
    </form>
  );
};

export default SidebarMobile;
