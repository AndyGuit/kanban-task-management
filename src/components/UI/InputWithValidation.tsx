import { ChangeEvent, Fragment } from 'react';
import useInput from '../../hooks/use-input';
import { IconCross } from '../Icons/Icons';
import Button from './Button';
import classes from './Input.module.scss';

type Props = {
  type: 'text' | 'textarea';
  isRemovable: boolean;
  onBlur?: () => void;
  onChange?: (val: string) => void;
  validateFn?: (val: string) => boolean;
  value?: string;
  id?: string;
  onRemove?: () => void;
};

const InputWithValidation = (props: Props) => {
  const validateFn = props.validateFn ?? (() => true);
  const inputState = useInput(validateFn, props.value ?? '');

  const inputClasses = `input ${classes.input} ${
    inputState.hasError ? 'invalid' : ''
  }`;

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    inputState.valueChangeHandler(e);

    if (props.onChange) props.onChange(e.target.value);
  };

  const blurHandler = () => {
    inputState.inputBlurHandler();

    if (props.onBlur) props.onBlur();
  };

  let content: React.ReactNode;
  if (props.type === 'textarea') {
    content = (
      <textarea
        id={props.id}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={blurHandler}
        className={inputClasses}
        rows={6}></textarea>
    );
  }

  if (props.type === 'text') {
    content = (
      <input
        id={props.id}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={blurHandler}
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
      {inputState.hasError && <p className="error-text">Invalid value</p>}
    </Fragment>
  );
};

export default InputWithValidation;
