import { useDispatch, useSelector } from 'react-redux';
import { DataSelectors } from 'src/app/providers/StoreProvider';
import { IColumn } from 'src/shared/types';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';
import { Button, ButtonStyle } from 'src/shared/ui';
import { TaskDraggable } from 'src/entities/Task';
import { ColumnDroppable } from 'src/entities/Column';
import { BoardEmpty } from '../BoardEmpty/BoardEmpty';
import { ModalActions } from 'src/widgets/ModalWithForms';
import classes from './BoardDragDrop.module.scss';

export const BoardDragDrop = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(DataSelectors.getActiveBoard);

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
