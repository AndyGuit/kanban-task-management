import Task from '../Task/Task';
import classes from './Column.module.scss';

const Column = () => {
  return (
    <div className={classes['column']}>
      <div className={`column-title ${classes['column-title']}`}>
        <span className={`${classes['column-dot']} column-dot--1`}></span>
        <h4>Column(0)</h4>
      </div>
      <ul className={`${classes['task-list']}`}>
        <li>
          <Task />
        </li>
        <li>
          <Task />
        </li>
        <li>
          <Task />
        </li>
      </ul>
    </div>
  );
};

export default Column;
