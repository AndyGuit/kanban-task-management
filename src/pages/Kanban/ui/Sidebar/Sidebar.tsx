import { useDispatch, useSelector } from 'react-redux';
import { ThemeToggle } from 'src/features/ThemeToggle';
import { DataSelectors, UIActions, UISelectors } from 'src/app/providers';
import { BoardsList } from 'src/pages/Kanban/Board';
import { Icons, Button, ButtonStyle } from 'src/shared/ui';
import classes from './Sidebar.module.scss';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const hasSidebar = useSelector(UISelectors.getIsHasSidebar);
  const numberOfBoards = useSelector(DataSelectors.getAllBoards).length;

  const toggleAside = () => {
    dispatch(UIActions.toggleSidebar());
  };

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
