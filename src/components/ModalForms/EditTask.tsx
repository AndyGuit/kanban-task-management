import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import useInput from '../../hooks/use-input';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import Input from '../UI/Input';
import classes from './Form.module.scss';
import validate from '../../functions/validate';
import { dataActions } from '../../store/slices/data-slice';
import { ISubtask, ITask } from '../../types/dataTypes';
import { uiActions } from '../../store/slices/ui-slice';
import InputWithValidation from '../UI/InputWithValidation';

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
  const [subtasksHasNames, setSubtasksHasNames] = useState(true);

  const titleInput = useInput(validate.notEmpty, taskData.title);
  const descriptionInput = useInput(() => true, taskData.description);
  const statusInput = useInput(validate.notEmpty, modalColumn.id);

  const removeSubtaskHandler = (index: number) => {
    const left = subtasksCopy.slice(0, index);
    const right = subtasksCopy.slice(index + 1);

    setSubtasksCopy(left.concat(right));
  };

  const [subtasksCopy, setSubtasksCopy] = useState<ISubtask[]>(
    taskData.subtasks.map(subt => ({ ...subt }))
  );

  const subtaskChangeHandler = (value: string, index: number) => {
    subtasksCopy[index].title = value;
    setSubtasksHasNames(true);
  };

  const subtasksList = (
    <Fragment>
      <ul className={`form-subtasks-list ${classes['form-subtasks-list']}`}>
        {subtasksCopy.map((subtask, index) => (
          // TODO: generate random id for key
          <li key={`${subtask.title}${index}`}>
            <InputWithValidation
              onChange={(value: string) => subtaskChangeHandler(value, index)}
              onBlur={() => setSubtasksCopy(subtasksCopy)}
              validateFn={validate.notEmpty}
              value={subtask.title}
              isRemovable={subtasksCopy.length > 1}
              onRemove={removeSubtaskHandler.bind(null, index)}
              type="text"
            />
          </li>
        ))}
      </ul>
      {!subtasksHasNames && (
        <p className="error-text">All subtasks should have title</p>
      )}
    </Fragment>
  );

  const addSubtaskHandler = () => {
    setSubtasksCopy(state => [...state, { isCompleted: false, title: '' }]);
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

    const subtasksHasValues = subtasksCopy.every(subt => subt.title !== '');
    setSubtasksHasNames(subtasksHasValues);

    if (titleInput.isValid && subtasksHasValues) {
      const editedTask: ITask = {
        title: titleInput.value,
        description: descriptionInput.value,
        id: taskData.id,
        status: newStatus.name,
        statusId: newStatus.statusId,
        subtasks: subtasksCopy,
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
    }
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
