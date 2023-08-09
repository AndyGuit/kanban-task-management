import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Checkbox from '../../Checkbox/Checkbox';
import { IconPopupDots } from '../../Icons/Icons';
import SelectInput from '../../SelectInput/SelectInput';
import Button from '../../UI/Button';
import classes from './ViewTask.module.scss';

const ViewTask = () => {
  const modalData = useSelector((state: RootState) => state.data.modalData);
  const [isPopupShown, setIsPopupShown] = useState(false);

  const completedSubtasks = modalData.subtasks.filter(subt => subt.isCompleted);
  const completedSubtasksString = `(${completedSubtasks.length} of ${modalData.subtasks.length})`;

  const togglePopup = () => {
    setIsPopupShown(prevState => !prevState);
  };

  const subtasksList = (
    <ul className={classes['subtasks-list']}>
      {modalData.subtasks.map((subtask, index) => (
        <li key={index}>
          <Checkbox {...subtask} />
        </li>
      ))}
    </ul>
  );

  return (
    <form className={`form ${classes.form}`}>
      <div className={classes['form-header']}>
        <h4>{modalData.title}</h4>
        <Button onClick={togglePopup} btnStyle="popup">
          <IconPopupDots />
        </Button>
      </div>
      <p className={`form-description ${classes['form-description']}`}>
        {modalData.description || 'No Description'}
      </p>
      <div className={classes['form-subtasks']}>
        <h5>Subtasks {completedSubtasksString}</h5>
        {subtasksList}
      </div>
      <SelectInput
        label="Current Status"
        disabled={true}
        options={[modalData.status]}
      />
    </form>
  );
};

export default ViewTask;
