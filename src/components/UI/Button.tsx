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

  if (props.btnStyle === 'add-task') {
    styles += `button-add-task ${classes['button-add-task']}`;
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
