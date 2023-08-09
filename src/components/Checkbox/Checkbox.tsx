import { useState } from 'react';
import classes from './Checkbox.module.scss';

type Props = {
  title: string;
  isCompleted: boolean;
  onChange: () => void;
};

const Checkbox = (props: Props) => {
  const [completed, setIsCompleted] = useState(props.isCompleted);

  const changeCompletedHandler = () => {
    setIsCompleted(prevState => !prevState);
    props.onChange();
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
      {props.title}
    </label>
  );
};

export default Checkbox;
