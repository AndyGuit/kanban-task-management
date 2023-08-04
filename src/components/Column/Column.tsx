import { IColumn } from '../../types/dataTypes';
import Task from '../Task/Task';
import classes from './Column.module.scss';

interface Props extends IColumn {
  index: number;
}

const Column = (props: Props) => {
  return (
    <div className={classes['column']}>
      <div className={`column-title ${classes['column-title']}`}>
        <span
          className={`${classes['column-dot']} column-dot--${
            props.index % 6
          }`}></span>
        <h4>
          {props.name}({props.tasks.length})
        </h4>
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
