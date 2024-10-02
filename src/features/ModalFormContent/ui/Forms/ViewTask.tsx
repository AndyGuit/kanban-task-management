import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '../../../../shared/ui/Checkbox/Checkbox';
import classes from './Form.module.scss';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';

import Select from '../../../../shared/ui/Select/Select';
import { DataActions, DataSelectors, UIActions } from '../../../../app/providers/StoreProvider';
import Button from '../../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';
import { IconPopupDots } from '../../../../shared/ui/Icons/Icons';
import { Popover, PopoverContentPosition } from '../../../../shared/ui/Popover';

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
        <Popover
          direction={PopoverContentPosition.BOTTOM_LEFT}
          trigger={
            <Button styleClass={ButtonStyle.POPUP}>
              <IconPopupDots />
            </Button>
          }
        >
          <Button onClick={editTaskHandler} styleClass={ButtonStyle.TEXT_PRIMARY}>
            Edit Task
          </Button>
          <Button onClick={deleteTaskHandler} styleClass={ButtonStyle.TEXT_WARNING}>
            Delete Task
          </Button>
        </Popover>
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
