import { useState } from 'react';
import { IconPopupDots } from '../../Icons/Icons';
import PopupWindow from '../../PopupWindow/PopupWindow';
import Button from '../../UI/Button';
import classes from './HeaderBoardInfo.module.scss';

type Props = {
  boardName: string;
};

const HeaderBoardInfo = (props: Props) => {
  const [isPopupShown, setIsPopupShown] = useState(false);

  const togglePopup = () => {
    setIsPopupShown(prevState => !prevState);
  };

  const onEditBoard = () => {
    setIsPopupShown(false);
  };

  const onDeleteBoard = () => {
    setIsPopupShown(false);
  };

  return (
    <div className={classes['board-info']}>
      <div className={classes['board-name']}>
        <h2>{props.boardName}</h2>
      </div>
      <div className={classes['board-controls']}>
        <Button btnStyle="add-task">+ Add New Task</Button>
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
