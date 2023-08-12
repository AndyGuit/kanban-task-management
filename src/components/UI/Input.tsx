import { ChangeEvent, useState } from 'react';
import { IconCross } from '../Icons/Icons';
import Button from './Button';
import classes from './Input.module.scss';

type Props = {
  type: 'text' | 'textarea';
  isRemovable: boolean;
  value?: string;
  id?: string;
  onRemove?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

const Input = (props: Props) => {
  const [value, setValue] = useState(props.value);

  const changeHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  let content: React.ReactNode;
  if (props.type === 'textarea') {
    content = (
      <textarea
        id={props.id}
        value={value}
        onChange={changeHandler}
        className={`input ${classes.input}`}
        rows={6}></textarea>
    );
  }

  if (props.type === 'text') {
    content = (
      <input
        id={props.id}
        value={value}
        onChange={changeHandler}
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
