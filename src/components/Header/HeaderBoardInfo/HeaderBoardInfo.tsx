import { useSelector, useDispatch } from 'react-redux';
import { getActiveBoard } from '../../../store/selectors/data-selectors';
import { uiActions } from '../../../store/slices/ui-slice';
import { ModalContent } from '../../../types/modalFormContentTypes';
import { ChevronDown } from '../../Icons/Icons';
import PopupWindow from '../../PopupWindow/PopupWindow';
import Button from '../../UI/Button';
import classes from './HeaderBoardInfo.module.scss';

const HeaderBoardInfo = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(getActiveBoard);

  const title = activeBoard?.name || 'No Boards Found';

  const onEditBoard = () => {
    dispatch(uiActions.setModalContent(ModalContent.editBoard));
    dispatch(uiActions.showModal());
  };

  const onDeleteBoard = () => {
    dispatch(uiActions.setModalContent(ModalContent.confirmDeleteBoard));
    dispatch(uiActions.showModal());
  };

  const addNewTask = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewTask));
    dispatch(uiActions.showModal());
  };

  const showSidebarModal = () => {
    dispatch(uiActions.setModalContent(ModalContent.sidebarMobile));
    dispatch(uiActions.showModal());
  };

  return (
    <div className={classes['board-info']}>
      <div className={classes['board-name']}>
        <h2>{title}</h2>
        <Button onClick={showSidebarModal} btnStyle="boards-mobile">
          <ChevronDown />
        </Button>
      </div>
      {activeBoard && (
        <div className={classes['board-controls']}>
          <Button onClick={addNewTask} btnStyle="add-task">
            +<span> Add New Task</span>
          </Button>
          <PopupWindow
            onClickEdit={onEditBoard}
            onClickDelete={onDeleteBoard}
            btnText="Board"
          />
        </div>
      )}
    </div>
  );
};

export default HeaderBoardInfo;
