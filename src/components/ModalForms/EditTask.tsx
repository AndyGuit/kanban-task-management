import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import Input from '../UI/Input';
import classes from './Form.module.scss';

const EditTask = () => {
  const taskData = useSelector((state: RootState) => state.data.modalTask);
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);

  const columnNames = activeBoard.columns.map(col => col.name);

  const subtasksList = (
    <ul className={`form-subtasks-list ${classes['form-subtasks-list']}`}>
      {taskData.subtasks.map((subtask, index) => (
        <li key={index}>
          <Input
            value={subtask.title}
            isRemovable={taskData.subtasks.length > 1}
            type="text"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <form className={`form ${classes.form}`}>
      <h3>Edit Task</h3>
      <div className={classes['form-input']}>
        <label htmlFor="edit-task">Title</label>
        <Input
          id="edit-task"
          value={taskData.title}
          isRemovable={false}
          type="text"
        />
      </div>
      <div className={classes['form-input']}>
        <label htmlFor="edit-description">Description</label>
        <Input
          id="edit-description"
          value={taskData.description}
          isRemovable={false}
          type="textarea"
        />
      </div>
      <div className={classes['form-input']}>
        <label>Subtasks</label>
        {subtasksList}
      </div>
      <Button btnStyle="form-secondary">+ Add New Subtask</Button>
      <SelectInput label="Status" disabled={false} options={columnNames} />
      <Button btnStyle="form-primary" type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default EditTask;