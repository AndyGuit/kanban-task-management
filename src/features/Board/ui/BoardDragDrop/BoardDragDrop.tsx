import { useDispatch, useSelector } from 'react-redux';
import { DataSelectors, UIActions } from '../../../../app/providers/StoreProvider';
import { IColumn } from '../../../../shared/types/dataTypes';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';
import Button from '../../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';
import { TaskDraggable } from '../../../../entities/Task';
import { ColumnDroppable } from '../../../../entities/Column';
import { BoardEmpty } from '../BoardEmpty/BoardEmpty';
import classes from './BoardDragDrop.module.scss';

export const BoardDragDrop = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(DataSelectors.getActiveBoard);

  const addNewColumnHandler = () => {
    dispatch(UIActions.setModalContent(ModalContent.addNewColumn));
    dispatch(UIActions.showModal());
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
            <TaskDraggable key={task.id} task={task} draggableIndex={taskIndex} />
          ))}
        </ColumnDroppable>
      ))}
      <Button
        onClick={addNewColumnHandler}
        styleClass={activeBoard.columns.length > 0 ? ButtonStyle.ADD_COLUMN : ButtonStyle.ADD_COLUMN_EMPTY_BOARD}
      >
        + New Column
      </Button>
    </main>
  );
};
