import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconBoard,
  IconHideSidebar,
  IconShowSidebar,
} from '../../components/Icons/Icons';
import ThemeToggler from '../../components/ThemeToggler/ThemeToggler';
import Button from '../../components/UI/Button';
import { RootState } from '../../store/index';
import { uiActions } from '../../store/slices/ui-slice';
import classes from './Sidebar.module.scss';

const BOARD_NAMES = ['board 1', 'board 2', 'board 3'];

const Sidebar = () => {
  const dispatch = useDispatch();
  const hasSidebar = useSelector((state: RootState) => state.ui.hasSidebar);

  const toggleAside = () => {
    dispatch(uiActions.toggleSidebar());
  };

  const asideClasses = `sidebar ${classes['sidebar']} ${
    hasSidebar ? '' : classes['hidden']
  }`;

  return (
    <Fragment>
      <aside className={asideClasses}>
        <nav>
          <h3>all boards ({BOARD_NAMES.length})</h3>
          <ul className={classes['boards-list']}>
            {BOARD_NAMES.map((board, i) => (
              <li key={i}>
                <Button btnStyle="select-board">
                  <IconBoard /> {board}
                </Button>
              </li>
            ))}
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
