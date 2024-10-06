import { ChangeEvent, useState } from 'react';
import classes from './Checkbox.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

// type CheckboxProps = React.ComponentProps<'input'> & { title: string };
// type CheckboxProps = React.ComponentPropsWithRef<'input'> & { title: string };
// type CheckboxProps = React.ComponentPropsWithoutRef<'input'> & { title: string };

const Checkbox = (props: Props) => {
  const { onChange, checked, title } = props;
  const [completed, setIsCompleted] = useState(checked);

  const changeCompletedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCompleted((prevState) => !prevState);
    onChange?.(e);
  };

  const labelClasses = `label ${classes['label']} ${completed ? `completed ${classes['completed']}` : ''}`;

  return (
    <label className={labelClasses}>
      <input checked={completed} type="checkbox" onChange={changeCompletedHandler} />
      {title}
    </label>
  );
};

export default Checkbox;
