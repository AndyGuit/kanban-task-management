import classes from './Container.module.scss';

interface Props {
  children: React.ReactNode;
}

const Container = (props: Props) => {
  return <div className={classes['container']}>{props.children}</div>;
};

export default Container;
