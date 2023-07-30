import { IconPopupDots } from '../../Icons/Icons';
import Button from '../../UI/Button';
import classes from './HeaderBoardInfo.module.scss';

type Props = {
  boardName: string;
};

const HeaderBoardInfo = (props: Props) => {
  return (
    <div className={classes['board-info']}>
      <div className={classes['board-name']}>
        <h2>{props.boardName}</h2>
      </div>
      <div className={classes['board-controls']}>
        <Button btnStyle="add-task">+ Add New Task</Button>
        <Button btnStyle="popup">
          <IconPopupDots />
        </Button>
      </div>
    </div>
  );
};

export default HeaderBoardInfo;
