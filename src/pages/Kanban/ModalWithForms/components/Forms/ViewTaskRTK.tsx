import { BoardsActions } from 'src/entities/BoardsSlice';
import { PopupEditTask } from '../../../Popup';
import { Select, Checkbox } from 'src/shared/ui';

import classes from './Form.module.scss';
import {
  boardsServiceRTK,
  useAppDispatch,
  useAppSelector,
} from 'src/shared/lib';

const ViewTask = () => {
  const dispatch = useAppDispatch();
  const { data: boards } = boardsServiceRTK.useFetchAllBoardsQuery(null);
  const activeBoard = boards?.find((board) => board.isActive);
  const { columnId, taskId } = useAppSelector((state) => state.boards);

  const { data: selectedTask } = boardsServiceRTK.useGetTaskByIdQuery({
    boardId: activeBoard!.id,
    columnId,
    taskId,
  });

  const { data: selectedColumn } = boardsServiceRTK.useGetColumnByIdQuery({
    boardId: activeBoard!.id,
    columnId,
  });
  const completedSubtasks = selectedTask?.subtasks.filter(
    (subtask) => subtask.isCompleted,
  );
  const columns = activeBoard?.columns.map((column) => ({
    name: column.name,
    statusId: column.id,
  }));

  const completedSubtasksString = `(${completedSubtasks?.length} of ${selectedTask?.subtasks.length})`;

  const changeSubtaskStatus = (index: number) => {
    dispatch(BoardsActions.toggleSubtaskStatus(index));
    dispatch(BoardsActions.saveChanges('task'));
  };

  const subtasksList = (
    <ul className={classes['subtasks-list']}>
      {selectedTask?.subtasks.map((subtask, index) => (
        <li key={index}>
          <Checkbox
            onChange={changeSubtaskStatus.bind(null, index)}
            checked={subtask.isCompleted}
            title={subtask.title}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <form className={`form ${classes.form}`}>
      <div className={classes['form-header']}>
        <h4>{selectedTask?.title}</h4>
        <PopupEditTask />
      </div>
      <p className={`form-description ${classes['form-description']}`}>
        {selectedTask?.description || 'No Description'}
      </p>
      <div className={classes['form-subtasks']}>
        <h5>Subtasks {completedSubtasksString}</h5>
        {subtasksList}
      </div>
      <Select
        label="Current Status"
        disabled={true}
        value={selectedColumn?.name || ''}
        options={columns!.map((col) => ({ id: col.statusId, name: col.name }))}
      />
    </form>
  );
};

export default ViewTask;
