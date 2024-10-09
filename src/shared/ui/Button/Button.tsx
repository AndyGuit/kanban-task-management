import classes from './Button.module.scss';
import { ButtonStyle } from './buttonStyles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  styleClass?: ButtonStyle;
}

// type ButtonProps = React.ComponentProps<'button'> & { isActive?: boolean, styleClass?: ButtonStyle };
// type ButtonProps = React.ComponentPropsWithRef<'button'> & { isActive?: boolean, styleClass?: ButtonStyle };
// type ButtonProps = React.ComponentPropsWithoutRef<'button'> & { isActive?: boolean, styleClass?: ButtonStyle };

const Button = (props: Props) => {
  let styles = `${classes.button} button-${props.styleClass} ${classes[`button-${props.styleClass}`]}`;

  if (props.isActive && classes[`active-${props.styleClass}`]) {
    // if we have active class for chosen button in classes module
    // add class from there
    styles += ` ${classes[`active-${props.styleClass}`]}`;
  } else if (props.isActive && !classes[`active-${props.styleClass}`]) {
    // else just add string 'active' to button type name
    styles += ` active-${props.styleClass}`;
  }

  return (
    <button
      onClick={props.onClick}
      type={props.type || 'button'}
      className={styles}
    >
      {props.children}
    </button>
  );
};

export default Button;
