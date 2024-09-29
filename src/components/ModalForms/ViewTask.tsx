import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '../Checkbox/Checkbox';
import PopupWindow from '../PopupWindow/PopupWindow';
import classes from './Form.module.scss';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { ModalContent } from '../../shared/types/modalFormContentTypes';
import {
  getColumnsStatus,
  getCompletedSubtasksOnSelectedTask,
  getSelectedColumn,
  getSelectedTask,
} from '../../store/selectors/data-selectors';
import Select from '../Select/Select';

const ViewTask = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(getSelectedTask);
  const selectedColumn = useSelector(getSelectedColumn);
  const completedSubtasks = useSelector(getCompletedSubtasksOnSelectedTask);
  const columns = useSelector(getColumnsStatus);

  const completedSubtasksString = `(${completedSubtasks.length} of ${selectedTask.subtasks.length})`;

  const changeSubtaskStatus = (index: number) => {
    dispatch(dataActions.toggleSubtaskStatus(index));
    dispatch(dataActions.saveChanges('task'));
  };

  const editTaskHandler = () => {
    dispatch(uiActions.setModalContent(ModalContent.editTask));
  };

  const deleteTaskHandler = () => {
    dispatch(uiActions.setModalContent(ModalContent.confirmDeleteTask));
  };

  const subtasksList = (
    <ul className={classes['subtasks-list']}>
      {selectedTask.subtasks.map((subtask, index) => (
        <li key={index}>
          <Checkbox onChange={changeSubtaskStatus.bind(null, index)} {...subtask} />
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
