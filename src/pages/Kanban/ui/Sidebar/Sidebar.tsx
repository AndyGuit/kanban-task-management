import { useSelector } from 'react-redux';
import { useState } from 'react';
import { ThemeToggle } from 'src/features/ThemeToggle';
import { BoardsList, BoardsSelectors } from 'src/pages/Kanban/Board';
import { Icons, Button, ButtonStyle } from 'src/shared/ui';
import classes from './Sidebar.module.scss';

export const Sidebar = () => {
  const [hasSidebar, setHasSidebar] = useState(true);
  const numberOfBoards = useSelector(BoardsSelectors.getAllBoards).length;

  const toggleAside = () => setHasSidebar((prev) => !prev);

  const asideClasses = `sidebar ${classes['sidebar']} ${hasSidebar ? '' : classes['hidden']}`;

  return (
    <>
      <aside className={asideClasses}>
        <nav>
          <h3>all boards ({numberOfBoards})</h3>
          <BoardsList />
        </nav>
        <div>
          <ThemeToggle />
          <Button onClick={toggleAside} styleClass={ButtonStyle.HIDE_SIDEBAR}>
            <Icons.HideSidebar /> Hide Sidebar
          </Button>
        </div>
      </aside>
      {!hasSidebar && (
        <Button onClick={toggleAside} styleClass={ButtonStyle.SHOW_SIDEBAR}>
          <Icons.ShowSidebar />
        </Button>
      )}
    </>
  );
};
