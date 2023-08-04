import { btnStyle } from '../../types/btnStylesTypes';
import classes from './Button.module.scss';

type Props = {
  children: React.ReactNode;
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
      styles += `button-select-board ${classes['button-board']}`;
      break;
    case 'active-board':
      styles += `button-select-board active ${classes['button-board']}`;
      break;
    case 'create-board':
      styles += `button-create-board ${classes['button-create-board']}`;
      break;
    case 'hide-sidebar':
      styles += `button-hide-sidebar ${classes['button-hide-sidebar']}`;
      break;
    case 'text-primary':
      styles += `button-text-primary ${classes['button-text-primary']}`;
      break;
    case 'text-warning':
      styles += `button-text-warning ${classes['button-text-warning']}`;
      break;
    case 'add-column':
      styles += `button-add-column ${classes['button-add-column']}`;
      break;
    case 'popup':
      styles += `button-popup ${classes['button-popup']}`;
      break;
    case 'show-sidebar':
      styles += `button-show-sidebar ${classes['button-show-sidebar']}`;
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
