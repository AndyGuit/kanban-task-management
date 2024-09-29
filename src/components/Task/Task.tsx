import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { ISubtask, ITask } from '../../shared/types/dataTypes';
import { ModalContent } from '../../shared/types/modalFormContentTypes';
import classes from './Task.module.scss';

interface Props extends ITask {
  index: number;
}

const Task = (props: Props) => {
  const dispatch = useDispatch();
  const completedSubtasks = props.subtasks.filter((subt: ISubtask) => subt.isCompleted);
  const showModal = () => {
    dispatch(dataActions.setSelectedColumn(props.statusId));
    dispatch(dataActions.setSelectedTask(props.id));
    dispatch(uiActions.setModalContent(ModalContent.viewTask));
    dispatch(uiActions.showModal());
  };

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          onClick={showModal}
          className={`task ${classes['task']}`}
        >
          <h5 className="task-name">{props.title}</h5>
          <p className="task-subtasks">
            {completedSubtasks.length} of {props.subtasks.length} subtasks
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
