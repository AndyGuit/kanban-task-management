import { IconCross } from '../Icons/Icons';
import Button from './Button';
import classes from './Input.module.scss';

type Props = {
  type: 'text' | 'textarea';
  isRemovable: boolean;
  value?: string;
  id?: string;
  onRemove?: () => void;
  onChange?: () => void;
};

const Input = (props: Props) => {
  let content: React.ReactNode;
  if (props.type === 'textarea') {
    content = (
      <textarea
        id={props.id}
        value={props.value}
        className={`input ${classes.input}`}
        rows={6}></textarea>
    );
  }

  if (props.type === 'text') {
    content = (
      <input
        id={props.id}
        value={props.value}
        className={`input ${classes.input}`}
        type="text"
      />
    );
  }

  return (
    <div className={classes['input-wrapper']}>
      {content}
      {props.isRemovable && (
        <Button onClick={props.onRemove}>
          <IconCross />
        </Button>
      )}
    </div>
  );
};

export default Input;
