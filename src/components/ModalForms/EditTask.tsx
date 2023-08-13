import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import useInput from '../../hooks/use-input';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import Input from '../UI/Input';
import classes from './Form.module.scss';
import validate from '../../functions/validate';
import { dataActions } from '../../store/slices/data-slice';
import { ITask } from '../../types/dataTypes';
import { uiActions } from '../../store/slices/ui-slice';

const EditTask = () => {
  const dispatch = useDispatch();
  const taskData = useSelector((state: RootState) => state.data.modalTask);
  const modalColumn = useSelector((state: RootState) => state.data.modalColumn);
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);
  const columns = activeBoard.columns.map(col => {
    return { name: col.name, statusId: col.id };
  });

  const [newStatus, setNewStatus] = useState<{
    name: string;
    statusId: string;
  }>({ name: modalColumn.name, statusId: modalColumn.id });

  const titleInput = useInput(validate.notEmpty, taskData.title);
  const descriptionInput = useInput(() => true, taskData.description);
  const statusInput = useInput(validate.notEmpty, modalColumn.id);

  const removeSubtaskHandler = (index: number) => {
    dispatch(dataActions.removeSubtask(index));
  };

  const subtasksList = (
    <ul className={`form-subtasks-list ${classes['form-subtasks-list']}`}>
      {taskData.subtasks.map((subtask, index) => (
        // TODO: generate random id for key
        // TODO: validate each input separately
        <li key={`${subtask.title}${index}`}>
          <Input
            value={subtask.title}
            isRemovable={taskData.subtasks.length > 1}
            onRemove={removeSubtaskHandler.bind(null, index)}
            type="text"
          />
        </li>
      ))}
    </ul>
  );

  const addSubtaskHandler = () => {
    dispatch(dataActions.addSubtask({ isCompleted: false, title: '' }));
  };

  const statusChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    statusInput.valueChangeHandler(e);

    const selectedStatus = columns.find(
      col => col.statusId === e.target.value
    )!;
    setNewStatus(selectedStatus);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleInput.isValid) return;

    const editedTask: ITask = {
      title: titleInput.value,
      description: descriptionInput.value,
      id: taskData.id,
      status: newStatus.name,
      statusId: newStatus.statusId,
      subtasks: taskData.subtasks,
    };

    if (taskData.statusId !== newStatus.statusId) {
      dispatch(dataActions.removeTask(taskData.id));
      dispatch(dataActions.saveChanges('column'));
      dispatch(dataActions.setModalColumn(newStatus.statusId));
      dispatch(dataActions.addTask(editedTask));
      dispatch(dataActions.setModalTask(editedTask));
      dispatch(dataActions.saveChanges('task'));
    } else {
      dispatch(dataActions.setModalTask(editedTask));
      dispatch(dataActions.saveChanges('task'));
    }
    dispatch(uiActions.hideModal());
  };

  return (
    <form onSubmit={submitHandler} className={`form ${classes.form}`}>
      <h3>Edit Task</h3>
      <div className={classes['form-input']}>
        <label htmlFor="edit-title">Title</label>
        <Input
          id="edit-title"
          invalid={!titleInput.isValid}
          value={titleInput.value}
          onChange={titleInput.valueChangeHandler}
          onBlur={titleInput.inputBlurHandler}
          isRemovable={false}
          type="text"
        />
      </div>
      <div className={classes['form-input']}>
        <label htmlFor="edit-description">Description</label>
        <Input
          id="edit-description"
          value={descriptionInput.value}
          onChange={descriptionInput.valueChangeHandler}
          onBlur={descriptionInput.inputBlurHandler}
          isRemovable={false}
          type="textarea"
        />
      </div>
      <div className={classes['form-input']}>
        <label>Subtasks</label>
        {subtasksList}
      </div>
      <Button onClick={addSubtaskHandler} btnStyle="form-secondary">
        + Add New Subtask
      </Button>
      <SelectInput
        value={statusInput.value}
        onChange={statusChangeHandler}
        label="Status"
        disabled={false}
        options={columns}
      />
      <Button btnStyle="form-primary" type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default EditTask;
