import { btnStyle } from '../../types/btnStylesTypes';
import classes from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  isActive?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  btnStyle?: btnStyle;
};

const Button = (props: Props) => {
  let styles = `${classes.button} button-${props.btnStyle} ${classes[`button-${props.btnStyle}`]}`;

  if (props.isActive && classes[`active-${props.btnStyle}`]) {
    // if we have active class for chosen button in classes module
    // add class from there
    styles += ` ${classes[`active-${props.btnStyle}`]}`;
  } else if (props.isActive && !classes[`active-${props.btnStyle}`]) {
    // else just add string 'active' to button type name
    styles += ` active-${props.btnStyle}`;
  }

  return (
    <button onClick={props.onClick} type={props.type || 'button'} className={styles}>
      {props.children}
    </button>
  );
};

export default Button;
