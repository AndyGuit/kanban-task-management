import { boardsServiceRTK, ModalContent, useAppDispatch } from 'src/shared/lib';
import { ButtonStyle, Button, Icons, AppLogo } from 'src/shared/ui';
import { PopupEditBoard } from '../../Popup';
import { ModalActions } from 'src/entities/ModalSlice';
import classes from './Header.module.scss';

export const HeaderRTK = () => {
  const dispatch = useAppDispatch();
  const { data: boards, isLoading } =
    boardsServiceRTK.useFetchAllBoardsQuery(null);
  const activeBoard = boards?.find((board) => board.isActive);

  const title = activeBoard?.name || 'No Boards Found';

  const addNewTask = () => {
    dispatch(ModalActions.setModalContent(ModalContent.addNewTask));
    dispatch(ModalActions.showModal());
  };

  const showSidebarModal = () => {
    dispatch(ModalActions.setModalContent(ModalContent.menuMobile));
    dispatch(ModalActions.showModal());
  };

  return (
    <header className={`header ${classes.header}`}>
      <AppLogo />
      <div className={classes['board-info']}>
        <div className={classes['board-name']}>
          <h2>{isLoading ? 'Loading...' : title}</h2>
          <Button
            onClick={showSidebarModal}
            styleClass={ButtonStyle.BOARDS_MOBILE}
          >
            <Icons.ChevronDown />
          </Button>
        </div>
        {activeBoard && (
          <div className={classes['board-controls']}>
            <Button onClick={addNewTask} styleClass={ButtonStyle.ADD_TASK}>
              +<span> Add New Task</span>
            </Button>
            <PopupEditBoard />
          </div>
        )}
      </div>
    </header>
  );
};
