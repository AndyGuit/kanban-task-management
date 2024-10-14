import { useDispatch, useSelector } from 'react-redux';
import { ModalContent } from 'src/shared/lib';
import { DataSelectors } from 'src/app/providers';
import { ButtonStyle, Button, Icons, AppLogo } from 'src/shared/ui';
import { PopupEditBoard } from 'src/features/Popup';
import { ModalActions } from 'src/widgets/ModalWithForms';
import classes from './Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(DataSelectors.getActiveBoard);

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
          <h2>{title}</h2>
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