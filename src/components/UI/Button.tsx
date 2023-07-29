import classes from './Button.module.scss';

type Props = {
  children: JSX.Element;
  classes?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
};

const Button = (props: Props) => {
  const styles = `${classes.button} ${props.classes ? props.classes : ''}`;

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
