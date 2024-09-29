import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconBoard, IconHideSidebar, IconShowSidebar } from '../../components/Icons/Icons';
import { IBoard } from '../../shared/types/dataTypes';
import ThemeToggler from '../../components/ThemeToggler/ThemeToggler';
import Button from '../../shared/ui/Button/Button';
import { uiActions } from '../../store/slices/ui-slice';
import classes from './Sidebar.module.scss';
import { dataActions } from '../../store/slices/data-slice';
import { ModalContent } from '../../shared/types/modalFormContentTypes';
import { getIsHasSidebar } from '../../store/selectors/ui-selectors';
import { getAllBoards } from '../../store/selectors/data-selectors';
import { ButtonStyle } from '../../shared/ui/Button/buttonStyles';

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

  const asideClasses = `sidebar ${classes['sidebar']} ${hasSidebar ? '' : classes['hidden']}`;

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
                  styleClass={ButtonStyle.SELECT_BOARD}
                  isActive={board.isActive}
                >
                  <IconBoard /> {board.name}
                </Button>
              </li>
            ))}
            <Button onClick={handleAddBoard} styleClass={ButtonStyle.CREATE_BOARD}>
              <IconBoard />+ Create New Board
            </Button>
          </ul>
        </nav>
        <div>
          <ThemeToggler />
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
    </Fragment>
  );
};

export default Sidebar;
