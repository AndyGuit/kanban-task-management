import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/slices/ui-slice';
import { ModalContent } from '../../../types/modalFormContentTypes';
import { IconPopupDots } from '../../Icons/Icons';
import PopupWindow from '../../PopupWindow/PopupWindow';
import Button from '../../UI/Button';
import classes from './HeaderBoardInfo.module.scss';

type Props = {
  boardName: string;
};

const HeaderBoardInfo = (props: Props) => {
  const dispatch = useDispatch();
  const [isPopupShown, setIsPopupShown] = useState(false);

  const togglePopup = () => {
    setIsPopupShown(prevState => !prevState);
  };

  const onEditBoard = () => {
    setIsPopupShown(false);
    dispatch(uiActions.setModalContent(ModalContent.editBoard));
    dispatch(uiActions.showModal());
  };

  const onDeleteBoard = () => {
    setIsPopupShown(false);
  };

  const addNewTask = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewTask));
    dispatch(uiActions.showModal());
  };

  return (
    <div className={classes['board-info']}>
      <div className={classes['board-name']}>
        <h2>{props.boardName}</h2>
      </div>
      <div className={classes['board-controls']}>
        <Button onClick={addNewTask} btnStyle="add-task">
          + Add New Task
        </Button>
        <div className={classes['popup-wrapper']}>
          <Button onClick={togglePopup} btnStyle="popup">
            <IconPopupDots />
          </Button>
          {isPopupShown && (
            <PopupWindow
              onClickEdit={onEditBoard}
              onClickDelete={onDeleteBoard}
              btnText="Board"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBoardInfo;
