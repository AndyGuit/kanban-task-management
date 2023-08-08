import { useState } from 'react';
import classes from './Checkbox.module.scss';

type Props = {
  name: string;
  isCompleted: boolean;
};

const Checkbox = (props: Props) => {
  const [completed, setIsCompleted] = useState(props.isCompleted);

  const changeCompletedHandler = () => {
    setIsCompleted(prevState => !prevState);
  };

  const labelClasses = `label ${classes['label']} ${
    completed ? `completed ${classes['completed']}` : ''
  }`;

  return (
    <label className={labelClasses}>
      <input
        checked={completed}
        type="checkbox"
        onChange={changeCompletedHandler}
      />
      {props.name}
    </label>
  );
};

export default Checkbox;
