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
  const modalTask = useSelector((state: RootState) => state.data.modalTask);
  const modalColumn = useSelector((state: RootState) => state.data.modalColumn);
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);
  const [isPopupShown, setIsPopupShown] = useState(false);

  const completedSubtasks = modalTask.subtasks.filter(subt => subt.isCompleted);
  const completedSubtasksString = `(${completedSubtasks.length} of ${modalTask.subtasks.length})`;
  const columns = activeBoard.columns.map(col => {
    return { name: col.name, statusId: col.id };
  });

  const changeSubtaskStatus = (index: number) => {
    dispatch(dataActions.toggleSubtaskStatus(index));
  };

  const togglePopup = () => {
    setIsPopupShown(prevState => !prevState);
  };

  const editTaskHandler = () => {
    dispatch(uiActions.setModalContent(ModalContent.editTask));
  };

  const subtasksList = (
    <ul className={classes['subtasks-list']}>
      {modalTask.subtasks.map((subtask, index) => (
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
        <h4>{modalTask.title}</h4>
        <Button onClick={togglePopup} btnStyle="popup">
          <IconPopupDots />
        </Button>
        {isPopupShown && (
          <PopupWindow onClickEdit={editTaskHandler} btnText="Task" />
        )}
      </div>
      <p className={`form-description ${classes['form-description']}`}>
        {modalTask.description || 'No Description'}
      </p>
      <div className={classes['form-subtasks']}>
        <h5>Subtasks {completedSubtasksString}</h5>
        {subtasksList}
      </div>
      <SelectInput
        label="Current Status"
        disabled={true}
        value={modalColumn.name}
        options={columns}
      />
    </form>
  );
};

export default ViewTask;
