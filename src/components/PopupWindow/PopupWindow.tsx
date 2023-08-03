import Button from '../UI/Button';
import classes from './PopupWindow.module.scss';

type Props = {
  btnText: 'Board' | 'Task';
  onClickDelete?: () => void;
  onClickEdit?: () => void;
};

const PopupWindow = (props: Props) => {
  return (
    <div className={`popup-window ${classes['popup-window']}`}>
      <Button onClick={props.onClickEdit} btnStyle="text-primary">
        Edit {props.btnText}
      </Button>
      <Button onClick={props.onClickDelete} btnStyle="text-warning">
        Delete {props.btnText}
      </Button>
    </div>
  );
};

export default PopupWindow;
