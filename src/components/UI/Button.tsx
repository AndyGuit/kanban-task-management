import { btnStyle } from '../../types/btnStylesTypes';
import classes from './Button.module.scss';

type Props = {
  children: JSX.Element;
  classes?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  btnStyle?: btnStyle;
};

const Button = (props: Props) => {
  let styles = `${classes.button} ${props.classes ? props.classes : ''}`;

  switch (props.btnStyle) {
    case 'add-task':
      styles += `button-add-task ${classes['button-add-task']}`;
      break;
    case 'form-primary':
      styles += `button-form-primary ${classes['button-form-primary']}`;
      break;
    case 'form-secondary':
      styles += `button-form-secondary ${classes['button-form-secondary']}`;
      break;
    case 'select-board':
      styles += `btn-select-board ${classes['btn-board']}`;
      break;
    case 'create-board':
      styles += `btn-create-board ${classes['btn-create-board']}`;
      break;
    default:
      break;
  }

  return (
    <button
      onClick={props.onClick}
      type={props.type || 'button'}
      className={styles}>
      {props.children}
    </button>
  );
};

export default Button;
