import { useDispatch, useSelector } from 'react-redux';
import { ThemeToggle } from '../../../features/ThemeToggle';
import {
  DataSelectors,
  UIActions,
  UISelectors,
} from '../../../app/providers/StoreProvider';
import { BoardsList } from '../../../features/Board/ui/BoardsList/BoardsList';
import Button from '../../../shared/ui/Button/Button';
import {
  IconHideSidebar,
  IconShowSidebar,
} from '../../../shared/ui/Icons/Icons';
import { ButtonStyle } from '../../../shared/ui/Button/buttonStyles';
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
            <IconHideSidebar /> Hide Sidebar
          </Button>
        </div>
      </aside>
      {!hasSidebar && (
        <Button onClick={toggleAside} styleClass={ButtonStyle.SHOW_SIDEBAR}>
          <IconShowSidebar />
        </Button>
      )}
    </>
  );
};
