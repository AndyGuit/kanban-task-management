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
import { RootState } from '../../store/index';
import { uiActions } from '../../store/slices/ui-slice';
import classes from './Sidebar.module.scss';
import { dataActions } from '../../store/slices/data-slice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const hasSidebar = useSelector((state: RootState) => state.ui.hasSidebar);
  const boards = useSelector((state: RootState) => state.data.boards);

  const toggleAside = () => {
    dispatch(uiActions.toggleSidebar());
  };

  const setActiveBoard = (boardId: string) => {
    dispatch(dataActions.setActiveBoard(boardId));
  };

  const asideClasses = `sidebar ${classes['sidebar']} ${
    hasSidebar ? '' : classes['hidden']
  }`;

  return (
    <Fragment>
      <aside className={asideClasses}>
        <nav>
          <h3>all boards ({boards.length})</h3>
          <ul className={classes['boards-list']}>
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
            <Button btnStyle="create-board">
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
