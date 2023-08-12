import { ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import useInput from '../../hooks/use-input';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import Input from '../UI/Input';
import classes from './Form.module.scss';
import validate from '../../functions/validate';
import { dataActions } from '../../store/slices/data-slice';

const EditTask = () => {
  const dispatch = useDispatch();
  const taskData = useSelector((state: RootState) => state.data.modalTask);
  const modalColumn = useSelector((state: RootState) => state.data.modalColumn);
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);
  const columns = activeBoard.columns.map(col => {
    return { name: col.name, statusId: col.id };
  });

  const titleInput = useInput(validate.notEmpty, taskData.title);
  const descriptionInput = useInput(validate.notEmpty, taskData.description);
  const statusInput = useInput(validate.notEmpty, modalColumn.name);

  const removeSubtaskHandler = (index: number) => {
    dispatch(dataActions.removeSubtask(index));
  };

  const subtasksList = (
    <ul className={`form-subtasks-list ${classes['form-subtasks-list']}`}>
      {taskData.subtasks.map((subtask, index) => (
        // TODO: generate random id for key
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

    const newStatus = columns.find(col => col.name === e.target.value)!;
    dispatch(dataActions.setTaskStatus(newStatus));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(taskData);
  };

  return (
    <form onSubmit={submitHandler} className={`form ${classes.form}`}>
      <h3>Edit Task</h3>
      <div className={classes['form-input']}>
        <label htmlFor="edit-task">Title</label>
        <Input
          id="edit-task"
          value={titleInput.value}
          onChange={titleInput.valueChangeHandler}
          onBlur={descriptionInput.inputBlurHandler}
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
