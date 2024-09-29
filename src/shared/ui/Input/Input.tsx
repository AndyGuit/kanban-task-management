import { ChangeEvent, Fragment, useState } from 'react';
import { IconCross } from '../../../shared/ui/Icons/Icons';
import Button from '../Button/Button';
import classes from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  isRemovable: boolean;
  invalid?: boolean;
  onRemove?: () => void;
}

const Input = (props: Props) => {
  const [value, setValue] = useState(props.value ?? '');

  const inputClasses = `input ${classes.input} ${props.invalid ? 'invalid' : ''}`;

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);

    if (props.onChange) props.onChange(e);
  };

  let content: React.ReactNode;
  if (props.type === 'textarea') {
    content = (
      <textarea
        id={props.id}
        value={value}
        onChange={changeHandler}
        onBlur={props.onBlur}
        className={inputClasses}
        rows={6}
      ></textarea>
    );
  }

  if (props.type === 'text') {
    content = (
      <input
        disabled={props.disabled}
        id={props.id}
        value={value}
        onChange={changeHandler}
        onBlur={props.onBlur}
        className={inputClasses}
        type="text"
      />
    );
  }

  return (
    <Fragment>
      <div className={classes['input-wrapper']}>
        {content}
        {props.isRemovable && (
          <Button onClick={props.onRemove}>
            <IconCross />
          </Button>
        )}
      </div>
      {props.invalid && <p className="error-text">Invalid value</p>}
    </Fragment>
  );
};

export default Input;
