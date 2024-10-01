import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '../../../../shared/ui/Checkbox/Checkbox';
import classes from './Form.module.scss';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';

import Select from '../../../../shared/ui/Select/Select';
import { DataActions, DataSelectors, UIActions } from '../../../../app/providers/StoreProvider';
import PopupWindow from '../../../../shared/ui/PopupWindow/PopupWindow';

const ViewTask = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(DataSelectors.getSelectedTask);
  const selectedColumn = useSelector(DataSelectors.getSelectedColumn);
  const completedSubtasks = useSelector(DataSelectors.getCompletedSubtasksOnSelectedTask);
  const columns = useSelector(DataSelectors.getColumnsStatus);

  const completedSubtasksString = `(${completedSubtasks.length} of ${selectedTask.subtasks.length})`;

  const changeSubtaskStatus = (index: number) => {
    dispatch(DataActions.toggleSubtaskStatus(index));
    dispatch(DataActions.saveChanges('task'));
  };

  const editTaskHandler = () => {
    dispatch(UIActions.setModalContent(ModalContent.editTask));
  };

  const deleteTaskHandler = () => {
    dispatch(UIActions.setModalContent(ModalContent.confirmDeleteTask));
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
        <PopupWindow onClickEdit={editTaskHandler} onClickDelete={deleteTaskHandler} btnText="Task" />
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
