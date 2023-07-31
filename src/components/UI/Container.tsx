import classes from './Container.module.scss';

type Props = {
  children: JSX.Element;
};

const Container = (props: Props) => {
  return <div className={classes['container']}>{props.children}</div>;
};

export default Container;
