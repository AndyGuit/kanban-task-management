import classes from './Loader.module.scss';

export const Loader = () => (
  <div className={classes.wrapper}>
    <div className={'loader' + ' ' + classes.loader}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
