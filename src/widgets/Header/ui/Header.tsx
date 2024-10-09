import { useDispatch, useSelector } from 'react-redux';
import { AppLogo } from '../../../shared/ui/AppLogo/AppLogo';
import { ModalContent } from '../../../shared/types/modalFormContentTypes';
import { DataSelectors, UIActions } from '../../../app/providers/StoreProvider';
import Button from '../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../shared/ui/Button/buttonStyles';
import { ChevronDown } from '../../../shared/ui/Icons/Icons';
import classes from './Header.module.scss';
import { PopupEditBoard } from '../../../features/Popup/ui/PopupEditBoard';

export const Header = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(DataSelectors.getActiveBoard);

  const title = activeBoard?.name || 'No Boards Found';

  const addNewTask = () => {
    dispatch(UIActions.setModalContent(ModalContent.addNewTask));
    dispatch(UIActions.showModal());
  };

  const showSidebarModal = () => {
    dispatch(UIActions.setModalContent(ModalContent.menuMobile));
    dispatch(UIActions.showModal());
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
            <ChevronDown />
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
