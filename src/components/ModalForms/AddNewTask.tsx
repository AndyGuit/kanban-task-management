import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import validate from '../../functions/validate';
import { RootState } from '../../store';
import { ISubtask, ITask } from '../../types/dataTypes';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import InputWithValidation from '../UI/InputWithValidation';
import classes from './Form.module.scss';

const AddNewTask = () => {
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);
  const columns = activeBoard.columns.map(col => {
    return { name: col.name, statusId: col.id };
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [subtasks, setSubtasks] = useState<ISubtask[]>([
    { title: '', isCompleted: false },
  ]);

  const [selectedColumn, setSelectedColumn] = useState<{
    name: string;
    statusId: string;
  }>({ ...columns[0] });

  const subtaskChangeHandler = (value: string, index: number) => {
    subtasks[index].title = value;
  };

  const addSubtaskHandler = () => {
    setSubtasks(state => [...state, { title: '', isCompleted: false }]);
  };

  const removeSubtaskHandler = (index: number) => {
    setSubtasks(state => state.filter((_, i) => i !== index));
  };

  const subtasksList = (
    <Fragment>
      <ul className={`form-subtasks-list ${classes['form-subtasks-list']}`}>
        {subtasks.map((subtask, index) => (
          // TODO: generate random id for key
          <li key={`${subtask.title}${index}`}>
            <InputWithValidation
              onBlur={() => setSubtasks([...subtasks])}
              onChange={(value: string) => subtaskChangeHandler(value, index)}
              validateFn={validate.notEmpty}
              value={subtask.title}
              isRemovable={subtasks.length > 1}
              onRemove={removeSubtaskHandler.bind(null, index)}
              type="text"
            />
          </li>
        ))}
      </ul>
      {/* {!subtasksHasNames && (
        <p className="error-text">All subtasks should have title</p>
      )} */}
    </Fragment>
  );

  const statusChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = columns.find(col => col.statusId === e.target.value)!;
    setSelectedColumn(status);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: ITask = {
      // TODO: create function that generates random Id
      id: Math.random().toString(),
      title,
      description,
      status: selectedColumn.name,
      statusId: selectedColumn.statusId,
      subtasks: subtasks,
    };

    console.log(newTask);
  };

  return (
    <form onSubmit={submitHandler} className={`form ${classes.form}`}>
      <h3>Add New Task</h3>
      <div className={classes['form-input']}>
        <label htmlFor="new-title">Title</label>
        <InputWithValidation
          onChange={(value: string) => setTitle(value)}
          validateFn={validate.notEmpty}
          isRemovable={false}
          type="text"
          id="new-title"
        />
      </div>
      <div className={classes['form-input']}>
        <label htmlFor="new-description">Description</label>
        <InputWithValidation
          onChange={(value: string) => setDescription(value)}
          isRemovable={false}
          type="textarea"
          id="new-description"
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
