import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Checkbox from '../Checkbox/Checkbox';
import { IconPopupDots } from '../Icons/Icons';
import PopupWindow from '../PopupWindow/PopupWindow';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import classes from './Form.module.scss';
import { useDispatch } from 'react-redux';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { ModalContent } from '../../types/modalFormContentTypes';

const ViewTask = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(
    (state: RootState) => state.data.selectedTask
  );
  const selectedColumn = useSelector(
    (state: RootState) => state.data.selectedColumn
  );
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);
  const [isPopupShown, setIsPopupShown] = useState(false);

  const completedSubtasks = selectedTask.subtasks.filter(
    subt => subt.isCompleted
  );
  const completedSubtasksString = `(${completedSubtasks.length} of ${selectedTask.subtasks.length})`;
  const columns = activeBoard.columns.map(col => {
    return { name: col.name, statusId: col.id };
  });

  const changeSubtaskStatus = (index: number) => {
    dispatch(dataActions.toggleSubtaskStatus(index));
    dispatch(dataActions.saveChanges('task'));
  };

  const togglePopup = () => {
    setIsPopupShown(prevState => !prevState);
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
          <Checkbox
            onChange={changeSubtaskStatus.bind(null, index)}
            {...subtask}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <form className={`form ${classes.form}`}>
      <div className={classes['form-header']}>
        <h4>{selectedTask.title}</h4>
        <Button onClick={togglePopup} btnStyle="popup">
          <IconPopupDots />
        </Button>
        {isPopupShown && (
          <PopupWindow
            onClickEdit={editTaskHandler}
            onClickDelete={deleteTaskHandler}
            btnText="Task"
          />
        )}
      </div>
      <p className={`form-description ${classes['form-description']}`}>
        {selectedTask.description || 'No Description'}
      </p>
      <div className={classes['form-subtasks']}>
        <h5>Subtasks {completedSubtasksString}</h5>
        {subtasksList}
      </div>
      <SelectInput
        label="Current Status"
        disabled={true}
        value={selectedColumn.id}
        options={columns}
      />
    </form>
  );
};

export default ViewTask;
