import { BoardsSelectors } from 'src/entities/BoardsSlice';
import { ModalContent, useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Button, ButtonStyle, Loader } from 'src/shared/ui';
import { BoardEmpty } from '../BoardEmpty/BoardEmpty';
import { ModalActions } from 'src/entities/ModalSlice';
import { TaskDraggable } from '../TaskDraggable/TaskDraggable';
import { ColumnDroppable } from '../ColumnDroppable/ColumnDroppable';
import { useEffect } from 'react';
import { fetchAllBoards } from 'src/entities/BoardsSlice';
import classes from './BoardDragDrop.module.scss';

export const BoardDragDrop = () => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(BoardsSelectors.getActiveBoard);
  const { isLoading, error } = useAppSelector((state) => state.boards);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return error;
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
