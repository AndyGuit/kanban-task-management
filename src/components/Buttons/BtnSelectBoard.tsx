import Button from '../UI/Button';
import { IconBoard } from '../Icons/Icons';
import classes from './BtnSelectBoard.module.scss';

type Props = {
  text: string;
};

const BtnSelectBoard = (props: Props) => {
  const styles = `btn-select-board ${classes['btn-select-board']}`;

  return (
    <Button classes={styles}>
      {<IconBoard />} {props.text}
    </Button>
  );
};

export default BtnSelectBoard;
