import { memo } from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { IColumn, ITask } from '../../shared/types/dataTypes';
import { TaskCard } from '../../entities/Task';
import { DraggableComponent } from '../../shared/lib/providers/DragNDrop';
import classes from './Column.module.scss';

interface Props extends IColumn {
  index: number;
}

const Column = memo((props: Props) => {
  const columnListClasses = `${classes['task-list']} ${
    props.tasks.length === 0 ? `task-list--empty ${classes['task-list--empty']}` : ''
  }`;

  return (
    <div className={classes['column']}>
      <div className={`column-title ${classes['column-title']}`}>
        <span className={`${classes['column-dot']} column-dot--${props.index % 6}`}></span>
        <h4>
          {props.name}({props.tasks.length})
        </h4>
      </div>
      <Droppable droppableId={props.id}>
        {(provided: DroppableProvided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className={columnListClasses}>
            {props.tasks.map((task: ITask, index) => {
              const { subtasks } = task;
              const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted).length;
              return (
                <DraggableComponent key={task.id} draggableId={task.id} index={index}>
                  <TaskCard title={task.title} subtitle={`${completedSubtasks} of ${subtasks.length} subtasks`} />
                </DraggableComponent>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
});

export default Column;
