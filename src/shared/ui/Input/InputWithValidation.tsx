import { ChangeEvent } from 'react';
import useInput from '../../lib/hooks/use-input';
import { Cross } from 'src/shared/ui/Icons/Icons';
import { Button } from '../Button/Button';
import classes from './Input.module.scss';

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  isRemovable: boolean;
  onBlurHandler?: () => void;
  onChangeHandler?: (val: string) => void;
  validateFn?: (val: string) => boolean;
  onRemove?: () => void;
}

export const InputWithValidation = (props: Props) => {
  const { validateFn = () => true } = props;
  const inputState = useInput(validateFn, props.value?.toString() ?? '');

  const inputClasses = `input ${classes.input} ${inputState.hasError ? 'invalid' : ''}`;

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    inputState.valueChangeHandler(e);

    props.onChangeHandler?.(e.target.value);
  };

  const blurHandler = () => {
    inputState.inputBlurHandler();

    props.onBlurHandler?.();
  };

  let content: React.ReactNode;
  if (props.type === 'textarea') {
    content = (
      <textarea
        id={props.id}
        value={inputState.value}
        disabled={props.disabled}
        onChange={changeHandler}
        onBlur={blurHandler}
        className={inputClasses}
        rows={6}
      ></textarea>
    );
  }

  if (props.type === 'text') {
    content = (
      <input
        id={props.id}
        value={inputState.value}
        disabled={props.disabled}
        onChange={changeHandler}
        onBlur={blurHandler}
        className={inputClasses}
        type="text"
      />
    );
  }

  return (
    <>
      <div className={classes['input-wrapper']}>
        {content}
        {props.isRemovable && (
          <Button onClick={props.onRemove}>
            <Cross />
          </Button>
        )}
      </div>
      {inputState.hasError && <p className="error-text">Invalid value</p>}
    </>
  );
};
