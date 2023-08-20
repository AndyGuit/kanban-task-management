import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { IBoard } from '../../types/dataTypes';
import { ModalContent } from '../../types/modalFormContentTypes';
import { IconBoard } from '../Icons/Icons';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import Button from '../UI/Button';
import classes from './Form.module.scss';

const SidebarMobile = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.data.boards);

  const setActiveBoard = (boardId: string) => {
    dispatch(dataActions.setActiveBoard(boardId));
    dispatch(uiActions.hideModal());
  };
  const handleAddBoard = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewBoard));
    dispatch(uiActions.showModal());
  };

  return (
    <form className={`form ${classes.form}`}>
      <nav className={`form-nav ${classes['form-nav']}`}>
        <h3>all boards ({boards.length})</h3>
        <ul>
          {boards.map((board: IBoard) => {
            const buttonClass = board.isActive
              ? 'active-board'
              : 'select-board';
            return (
              <li key={board.id}>
                <Button
                  onClick={setActiveBoard.bind(null, board.id)}
                  btnStyle={buttonClass}>
                  <IconBoard /> {board.name}
                </Button>
              </li>
            );
          })}
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
