import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
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
      <Droppable droppableId={props.id}>
        {(provided: DroppableProvided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={columnListClasses}>
            {props.tasks.map((task: ITask, index) => (
              <li key={task.id}>
                <Task {...task} index={index} />
              </li>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
