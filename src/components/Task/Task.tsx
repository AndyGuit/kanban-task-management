import { ISubtask, ITask } from '../../types/dataTypes';
import classes from './Task.module.scss';

const Task = (props: ITask) => {
  const completedSubtasks = props.subtasks.filter(
    (subt: ISubtask) => subt.isCompleted
  );

  return (
    <div className={`task ${classes['task']}`}>
      <h5 className="task-name">{props.title}</h5>
      <p className="task-subtasks">
        {completedSubtasks.length} of {props.subtasks.length} subtasks
      </p>
    </div>
  );
};

export default Task;
