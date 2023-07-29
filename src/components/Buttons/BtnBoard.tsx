import Button from '../UI/Button';
import { IconBoard } from '../Icons/Icons';
import classes from './BtnBoard.module.scss';

type Props = {
  text: string;
  type: 'select' | 'create';
  onClick?: () => void;
};

const BtnSelectBoard = (props: Props) => {
  let styles;

  if (props.type === 'select') {
    styles = `btn-select-board ${classes['btn-board']}`;
  } else {
    styles = `btn-create-board ${classes['btn-board']} ${classes['btn-create-board']}`;
  }

  return (
    <Button onClick={props.onClick} classes={styles}>
      {<IconBoard />} {props.text}
    </Button>
  );
};

export default BtnSelectBoard;
