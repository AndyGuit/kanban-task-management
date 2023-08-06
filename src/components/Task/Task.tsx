import { useDispatch } from 'react-redux';
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
    dispatch(uiActions.setModalContent(ModalContent.viewCard));
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
