import { useSelector, useDispatch } from 'react-redux';
import classes from './Form.module.scss';

import { DataActions, DataSelectors } from 'src/app/providers/StoreProvider';
import { PopupEditTask } from '../../Popup';
import { Select, Checkbox } from 'src/shared/ui';

const ViewTask = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(DataSelectors.getSelectedTask);
  const selectedColumn = useSelector(DataSelectors.getSelectedColumn);
  const completedSubtasks = useSelector(
    DataSelectors.getCompletedSubtasksOnSelectedTask,
  );
  const columns = useSelector(DataSelectors.getColumnsStatus);

  const completedSubtasksString = `(${completedSubtasks.length} of ${selectedTask.subtasks.length})`;

  const changeSubtaskStatus = (index: number) => {
    dispatch(DataActions.toggleSubtaskStatus(index));
    dispatch(DataActions.saveChanges('task'));
  };

  const subtasksList = (
    <ul className={classes['subtasks-list']}>
      {selectedTask.subtasks.map((subtask, index) => (
        <li key={index}>
          <Checkbox
            onChange={changeSubtaskStatus.bind(null, index)}
            checked={subtask.isCompleted}
            title={subtask.title}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <form className={`form ${classes.form}`}>
      <div className={classes['form-header']}>
        <h4>{selectedTask.title}</h4>
        <PopupEditTask />
      </div>
      <p className={`form-description ${classes['form-description']}`}>
        {selectedTask.description || 'No Description'}
      </p>
      <div className={classes['form-subtasks']}>
        <h5>Subtasks {completedSubtasksString}</h5>
        {subtasksList}
      </div>
      <Select
        label="Current Status"
        disabled={true}
        value={selectedColumn.name}
        options={columns.map((col) => ({ id: col.statusId, name: col.name }))}
      />
    </form>
  );
};

export default ViewTask;
