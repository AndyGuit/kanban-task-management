import { useDispatch } from 'react-redux';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { ISubtask, ITask } from '../../types/dataTypes';
import { ModalContent } from '../../types/modalFormContentTypes';
import classes from './Task.module.scss';

const Task = (props: ITask) => {
  const dispatch = useDispatch();
  const completedSubtasks = props.subtasks.filter(
    (subt: ISubtask) => subt.isCompleted
  );
  const showModal = () => {
    dispatch(dataActions.setModalTask(props));
    dispatch(dataActions.setModalColumn(props.statusId));
    dispatch(uiActions.setModalContent(ModalContent.viewTask));
    dispatch(uiActions.showModal());
  };

  return (
    <div onClick={showModal} className={`task ${classes['task']}`}>
      <h5 className="task-name">{props.title}</h5>
      <p className="task-subtasks">
        {completedSubtasks.length} of {props.subtasks.length} subtasks
      </p>
    </div>
  );
};

export default Task;
