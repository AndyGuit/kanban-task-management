import { useDispatch, useSelector } from 'react-redux';
import { BoardsSelectors } from 'src/entities/BoardsSlice';
import { ModalContent } from 'src/shared/lib';
import { Button, ButtonStyle } from 'src/shared/ui';
import { BoardEmpty } from '../BoardEmpty/BoardEmpty';
import { ModalActions } from 'src/entities/ModalSlice';
import { TaskDraggable } from '../TaskDraggable/TaskDraggable';
import { ColumnDroppable } from '../ColumnDroppable/ColumnDroppable';
import classes from './BoardDragDrop.module.scss';

export const BoardDragDrop = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(BoardsSelectors.getActiveBoard);

  const addNewColumnHandler = () => {
    dispatch(ModalActions.setModalContent(ModalContent.addNewColumn));
    dispatch(ModalActions.showModal());
  };

  if (!activeBoard) {
    return (
      <main className={`board ${classes['board']}`}>
        <BoardEmpty />
      </main>
    );
  }

  return (
    <main className={`board ${classes['board']}`}>
      {activeBoard.columns.map((column: IColumn, columnIndex) => (
        <ColumnDroppable column={column} index={columnIndex} key={column.id}>
          {column.tasks.map((task, taskIndex) => (
            <TaskDraggable
              key={task.id}
              task={task}
              draggableIndex={taskIndex}
            />
          ))}
        </ColumnDroppable>
      ))}
      <Button
        onClick={addNewColumnHandler}
        styleClass={
          activeBoard.columns.length > 0
            ? ButtonStyle.ADD_COLUMN
            : ButtonStyle.ADD_COLUMN_EMPTY_BOARD
        }
      >
        + New Column
      </Button>
    </main>
  );
};
