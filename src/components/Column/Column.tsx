import { IColumn, ITask } from '../../types/dataTypes';
import Task from '../Task/Task';
import classes from './Column.module.scss';

interface Props extends IColumn {
  index: number;
}

const Column = (props: Props) => {
  const columnListClasses = `${classes['task-list']} ${
    props.tasks.length === 0 ? 'task-list--empty' : ''
  }`;

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
      <ul className={columnListClasses}>
        {props.tasks.map((task: ITask) => (
          <li key={task.id}>
            <Task {...task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
