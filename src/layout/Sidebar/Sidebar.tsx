import { IconBoard, IconHideSidebar } from '../../components/Icons/Icons';
import ThemeToggler from '../../components/ThemeToggler/ThemeToggler';
import Button from '../../components/UI/Button';
import classes from './Sidebar.module.scss';

const BOARD_NAMES = ['board 1', 'board 2', 'board 3'];

const Sidebar = () => {
  return (
    <aside className={`sidebar ${classes['sidebar']}`}>
      <nav>
        <h3>all boards ({BOARD_NAMES.length})</h3>
        <ul className={classes['boards-list']}>
          {BOARD_NAMES.map(board => (
            <li>
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
        <Button btnStyle="hide-sidebar">
          <IconHideSidebar /> Hide Sidebar
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
