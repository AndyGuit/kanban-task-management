import { memo } from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { IColumn, ITask } from '../../shared/types/dataTypes';
import { DraggableComponent } from '../../shared/lib/providers/DragNDrop';
import { TaskCard } from '../../shared/ui/TaskCard/TaskCard';
import classes from './Column.module.scss';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { ModalContent } from '../../shared/types/modalFormContentTypes';
import { useDispatch } from 'react-redux';

interface Props extends IColumn {
  index: number;
}
/**
 * @TODO
 * Remove this component
 */
const Column = memo((props: Props) => {
  const dispatch = useDispatch();
  const columnListClasses = `${classes['task-list']} ${
    props.tasks.length === 0 ? `task-list--empty ${classes['task-list--empty']}` : ''
  }`;

  const ShowTaskDetails = (columnId: string, taskId: string) => {
    dispatch(dataActions.setSelectedColumn(columnId));
    dispatch(dataActions.setSelectedTask(taskId));
    dispatch(uiActions.setModalContent(ModalContent.viewTask));
    dispatch(uiActions.showModal());
  };

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
                  <TaskCard
                    onClick={() => ShowTaskDetails(task.statusId, task.id)}
                    title={task.title}
                    subtitle={`${completedSubtasks} of ${subtasks.length} subtasks`}
                  />
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
