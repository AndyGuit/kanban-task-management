import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import generateRandomId from '../../functions/randomId';
import validate from '../../functions/validate';
import useInput from '../../hooks/use-input';
import { getColumnsStatus } from '../../store/selectors/data-selectors';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { ISubtask, ITask } from '../../types/dataTypes';
import InputsList from '../InputsList/InputsList';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import Input from '../UI/Input';
import classes from './Form.module.scss';

const AddNewTask = () => {
  const dispatch = useDispatch();
  const columns = useSelector(getColumnsStatus);

  const titleInput = useInput(validate.notEmpty);
  const descriptionInput = useInput(() => true);

  const [subtasks, setSubtasks] = useState<ISubtask[]>([
    { title: '', isCompleted: false },
  ]);

  const [subtasksHasNames, setSubtasksHasNames] = useState(true);

  const [selectedColumn, setSelectedColumn] = useState<{
    name: string;
    statusId: string;
  }>({ ...columns[0] });

  const subtaskChangeHandler = (value: string, index: number) => {
    subtasks[index].title = value;
    setSubtasksHasNames(true);
  };

  const addSubtaskHandler = () => {
    setSubtasks(state => [...state, { title: '', isCompleted: false }]);
  };

  const removeSubtaskHandler = (index: number) => {
    setSubtasks(state => state.filter((_, i) => i !== index));
  };

  const statusChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = columns.find(col => col.statusId === e.target.value)!;
    setSelectedColumn(status);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubtasksHasNames(subtasks.every(subt => subt.title !== ''));
    titleInput.inputBlurHandler();

    if (titleInput.isValid && subtasksHasNames) {
      const newTask: ITask = {
        id: generateRandomId(),
        title: titleInput.value,
        description: descriptionInput.value,
        status: selectedColumn.name,
        statusId: selectedColumn.statusId,
        subtasks: subtasks,
      };

      dispatch(dataActions.setSelectedColumn(selectedColumn.statusId));
      dispatch(dataActions.addTask(newTask));
      dispatch(dataActions.saveChanges('column'));
      dispatch(uiActions.hideModal());
    }
  };

  return (
    <form onSubmit={submitHandler} className={`form ${classes.form}`}>
      <h3>Add New Task</h3>
      <div className={classes['form-input']}>
        <label htmlFor="new-title">Title</label>
        <Input
          type="text"
          id="new-title"
          invalid={titleInput.hasError}
          onChange={titleInput.valueChangeHandler}
          onBlur={titleInput.inputBlurHandler}
          value={titleInput.value}
          isRemovable={false}
        />
      </div>
      <div className={classes['form-input']}>
        <label htmlFor="new-description">Description</label>
        <Input
          type="textarea"
          id="new-description"
          invalid={descriptionInput.hasError}
          onChange={descriptionInput.valueChangeHandler}
          onBlur={descriptionInput.inputBlurHandler}
          value={descriptionInput.value}
          isRemovable={false}
        />
      </div>
      <div className={classes['form-input']}>
        <label>Subtasks</label>
        <InputsList
          listItems={subtasks.map(subt => ({
            name: subt.title,
            isDisabled: false,
            isRemovable: subtasks.length > 1,
          }))}
          isScrollable={subtasks.length > 1}
          isInputsNotEmpty={subtasksHasNames}
          setIsInputsNotEmpty={setSubtasksHasNames}
          isValidFunc={validate.notEmpty}
          blurInputHandler={() => setSubtasks([...subtasks])}
          changeInputHandler={(value, index) =>
            subtaskChangeHandler(value, index)
          }
          removeInputHandler={index => removeSubtaskHandler(index)}
        />
      </div>
      <Button onClick={addSubtaskHandler} btnStyle="form-secondary">
        + Add New Subtask
      </Button>
      <SelectInput
        value={selectedColumn.statusId}
        onChange={statusChangeHandler}
        label="Status"
        disabled={false}
        options={columns}
      />
      <Button btnStyle="form-primary" type="submit">
        Create Task
      </Button>
    </form>
  );
};

export default AddNewTask;
