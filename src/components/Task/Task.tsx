import classes from './Task.module.scss';

const Task = () => {
  return (
    <div className={`task ${classes['task']}`}>
      <h5 className="task-name">Task Name</h5>
      <p className="task-subtasks">0 of 6 subtasks</p>
    </div>
  );
};

export default Task;
