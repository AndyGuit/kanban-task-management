import classes from './TasksColumn.module.scss';

interface Props {
  children?: React.ReactNode;
  title: string;
  dotNumber: number; // TODO: should be range from 0 to 5
  isEmpty: boolean;
}

export const TasksColumn = (props: Props) => {
  const { children, title, dotNumber, isEmpty } = props;

  const columnListClasses = `${classes['task-list']} ${
    isEmpty ? `task-list--empty ${classes['task-list--empty']}` : ''
  }`;

  return (
    <div className={classes['column']}>
      <div className={`column-title ${classes['column-title']}`}>
        <span className={`${classes['column-dot']} column-dot--${dotNumber}`}></span>
        <h4>{title}</h4>
      </div>
      <ul className={columnListClasses}>{children}</ul>
    </div>
  );
};
