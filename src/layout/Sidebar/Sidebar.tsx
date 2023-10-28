import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconBoard,
  IconHideSidebar,
  IconShowSidebar,
} from '../../components/Icons/Icons';
import { IBoard } from '../../types/dataTypes';
import ThemeToggler from '../../components/ThemeToggler/ThemeToggler';
import Button from '../../components/UI/Button';
import { uiActions } from '../../store/slices/ui-slice';
import classes from './Sidebar.module.scss';
import { dataActions } from '../../store/slices/data-slice';
import { ModalContent } from '../../types/modalFormContentTypes';
import { getIsHasSidebar } from '../../store/selectors/ui-selectors';
import { getAllBoards } from '../../store/selectors/data-selectors';

const Sidebar = () => {
  const dispatch = useDispatch();
  const hasSidebar = useSelector(getIsHasSidebar);
  const boards = useSelector(getAllBoards);

  const toggleAside = () => {
    dispatch(uiActions.toggleSidebar());
  };

  const setActiveBoard = (boardId: string) => {
    dispatch(dataActions.setActiveBoard(boardId));
  };

  const asideClasses = `sidebar ${classes['sidebar']} ${
    hasSidebar ? '' : classes['hidden']
  }`;

  const handleAddBoard = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewBoard));
    dispatch(uiActions.showModal());
  };

  return (
    <Fragment>
      <aside className={asideClasses}>
        <nav>
          <h3>all boards ({boards.length})</h3>
          <ul className={classes['boards-list']}>
            {boards.map((board: IBoard) => (
              <li key={board.id}>
                <Button
                  onClick={setActiveBoard.bind(null, board.id)}
                  btnStyle="select-board"
                  isActive={board.isActive}>
                  <IconBoard /> {board.name}
                </Button>
              </li>
            ))}
            <Button onClick={handleAddBoard} btnStyle="create-board">
              <IconBoard />+ Create New Board
            </Button>
          </ul>
        </nav>
        <div>
          <ThemeToggler />
          <Button onClick={toggleAside} btnStyle="hide-sidebar">
            <IconHideSidebar /> Hide Sidebar
          </Button>
        </div>
      </aside>
      {!hasSidebar && (
        <Button onClick={toggleAside} btnStyle="show-sidebar">
          <IconShowSidebar />
        </Button>
      )}
    </Fragment>
  );
};

export default Sidebar;
