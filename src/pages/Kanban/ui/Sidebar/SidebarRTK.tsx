import { useState } from 'react';
import { ThemeToggle } from 'src/features/ThemeToggle';
import { BoardsListRTK } from '../../Board/components/BoardsList/BoardsListRTK';
import { Icons, Button, ButtonStyle } from 'src/shared/ui';
import { boardsServiceRTK } from 'src/shared/lib';
import classes from './Sidebar.module.scss';

export const SidebarRTK = () => {
  const [hasSidebar, setHasSidebar] = useState(true);
  const { data: boards } = boardsServiceRTK.useFetchAllBoardsQuery(null);

  const toggleAside = () => setHasSidebar((prev) => !prev);

  const asideClasses = `sidebar ${classes['sidebar']} ${hasSidebar ? '' : classes['hidden']}`;

  return (
    <>
      <aside className={asideClasses}>
        <nav>
          <h3>all boards ({boards?.length || 0})</h3>
          <BoardsListRTK />
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
