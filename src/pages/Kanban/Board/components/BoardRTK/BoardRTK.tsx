import { boardsServiceRTK, ModalContent, useAppDispatch } from 'src/shared/lib';
import { Button, ButtonStyle, Loader } from 'src/shared/ui';
import { BoardEmpty } from '../BoardEmpty/BoardEmpty';
import { TaskDraggable } from '../TaskDraggable/TaskDraggable';
import { ColumnDroppable } from '../ColumnDroppable/ColumnDroppable';
import classes from './BoardRTK.module.scss';
import { ModalActions } from 'src/entities/ModalSlice';

export const BoardRTK = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    data: boards,
    error,
  } = boardsServiceRTK.useFetchAllBoardsQuery(null);
  const activeBoard = boards?.find((board) => board.isActive);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <main className={`board ${classes['board']}`}>
        Error while fetching boards.
      </main>
    );
  }

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
      {activeBoard?.columns?.map((column: IColumn, columnIndex) => (
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
          activeBoard?.columns?.length > 0
            ? ButtonStyle.ADD_COLUMN
            : ButtonStyle.ADD_COLUMN_EMPTY_BOARD
        }
      >
        + New Column
      </Button>
    </main>
  );
};
