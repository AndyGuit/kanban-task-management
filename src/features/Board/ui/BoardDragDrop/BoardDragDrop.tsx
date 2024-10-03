import { useDispatch, useSelector } from 'react-redux';
import { DataSelectors, UIActions } from '../../../../app/providers/StoreProvider';
import { DroppableComponent } from '../../../../shared/lib/providers/DragNDrop/ui/DroppableComponent';
import { IColumn } from '../../../../shared/types/dataTypes';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';
import Button from '../../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';
import { TasksColumn } from '../../../../shared/ui/TasksColumn/TasksColumn';
import classes from './BoardDragDrop.module.scss';
import { TaskDraggable } from '../../../../entities/Task';

export const BoardDragDrop = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(DataSelectors.getActiveBoard);

  const addNewColumnHandler = () => {
    dispatch(UIActions.setModalContent(ModalContent.addNewColumn));
    dispatch(UIActions.showModal());
  };

  return (
    <main className={`board ${classes['board']}`}>
      {activeBoard.columns.map((column: IColumn, columnIndex) => {
        const { tasks } = column;
        const columnTitle = `${column.name}(${tasks.length})`;

        return (
          <DroppableComponent key={column.id} droppableId={column.id}>
            <TasksColumn title={columnTitle} isEmpty={tasks.length === 0} dotNumber={columnIndex % 6}>
              {tasks.map((task, taskIndex) => (
                <TaskDraggable {...task} taskIndex={taskIndex} />
              ))}
            </TasksColumn>
          </DroppableComponent>
        );
      })}
      {activeBoard && (
        <Button
          onClick={addNewColumnHandler}
          styleClass={activeBoard.columns.length > 0 ? ButtonStyle.ADD_COLUMN : ButtonStyle.ADD_COLUMN_EMPTY_BOARD}
        >
          + New Column
        </Button>
      )}
    </main>
  );
};
