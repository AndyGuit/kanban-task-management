import SelectInput from '../../SelectInput/SelectInput';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import classes from '../Form.module.scss';

const EditTask = () => {
  return (
    <form className={`form ${classes.form}`}>
      <h3>Edit Task</h3>
      <div className={classes['form-input']}>
        <label htmlFor="edit-task">Title</label>
        <Input
          id="edit-task"
          value="input value"
          isRemovable={false}
          type="text"
        />
      </div>
      <div className={classes['form-input']}>
        <label htmlFor="edit-description">Description</label>
        <Input
          id="edit-description"
          value="textarea"
          isRemovable={false}
          type="textarea"
        />
      </div>
      <div className={classes['form-input']}>
        <label htmlFor="edit-subtasks">Subtasks</label>
        <Input
          id="edit-subtasks"
          value="input value"
          isRemovable={false}
          type="text"
        />
      </div>
      <Button btnStyle="form-secondary">+ Add New Subtask</Button>
      <SelectInput label="Status" disabled={false} options={['opt1', 'opt2']} />
      <Button btnStyle="form-primary" type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default EditTask;
