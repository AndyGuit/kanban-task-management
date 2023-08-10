import Input from '../../UI/Input';
import classes from './EditTask.module.scss';

const EditTask = () => {
  return (
    <form className={`form`}>
      Edit Task
      <Input value="input value" isRemovable={true} type="text" />
      <Input value="input value" isRemovable={false} type="text" />
      <Input value="text area" isRemovable={false} type="textarea" />
    </form>
  );
};

export default EditTask;
