import classes from './TaskCard.module.scss';
import { ITask } from '../../../shared/types/dataTypes';

interface Props extends ITask {
  subtitle: string;
  onClick?: () => void;
}

export const TaskCard = (props: Props) => {
  const { onClick, title, subtitle } = props;

  return (
    <div onClick={onClick} className={`task ${classes['task']}`}>
      <h5 className="task-name">{title}</h5>
      <p className="task-subtasks">{subtitle}</p>
    </div>
  );
};
