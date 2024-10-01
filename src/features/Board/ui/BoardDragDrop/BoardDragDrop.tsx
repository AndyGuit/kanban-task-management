import { useDispatch, useSelector } from 'react-redux';
import { DataActions, DataSelectors, UIActions } from '../../../../app/providers/StoreProvider';
import { DraggableComponent } from '../../../../shared/lib/providers/DragNDrop';
import { DroppableComponent } from '../../../../shared/lib/providers/DragNDrop/ui/DroppableComponent';
import { IColumn } from '../../../../shared/types/dataTypes';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';
import Button from '../../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';
import { TaskCard } from '../../../../shared/ui/TaskCard/TaskCard';
import { TasksColumn } from '../../../../shared/ui/TasksColumn/TasksColumn';
import classes from './BoardDragDrop.module.scss';

export const BoardDragDrop = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(DataSelectors.getActiveBoard);

  const addNewColumnHandler = () => {
    dispatch(UIActions.setModalContent(ModalContent.addNewColumn));
    dispatch(UIActions.showModal());
  };

  const viewTaskDetails = (columnId: string, taskId: string) => {
    dispatch(DataActions.setSelectedColumn(columnId));
    dispatch(DataActions.setSelectedTask(taskId));
    dispatch(UIActions.setModalContent(ModalContent.viewTask));
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
              {tasks.map((task, taskIndex) => {
                const { subtasks } = task;
                const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted).length;

                return (
                  <DraggableComponent key={task.id} draggableId={task.id} index={taskIndex}>
                    <TaskCard
                      onClick={() => viewTaskDetails(task.statusId, task.id)}
                      title={task.title}
                      subtitle={`${completedSubtasks} of ${subtasks.length} subtasks`}
                    />
                  </DraggableComponent>
                );
              })}
            </TasksColumn>
          </DroppableComponent>
        );
      })}
      {activeBoard && (
        <Button onClick={addNewColumnHandler} styleClass={ButtonStyle.ADD_COLUMN}>
          + New Column
        </Button>
      )}
    </main>
  );
};
