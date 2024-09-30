import { useDispatch, useSelector } from 'react-redux';
// import Column from '../../components/Column/Column';
import Button from '../../shared/ui/Button/Button';
import { getActiveBoard } from '../../store/selectors/data-selectors';
import { uiActions } from '../../store/slices/ui-slice';
import { IColumn } from '../../shared/types/dataTypes';
import { ModalContent } from '../../shared/types/modalFormContentTypes';
import classes from './Board.module.scss';
// import NoBoards from './NoBoards';
import { ButtonStyle } from '../../shared/ui/Button/buttonStyles';
import { DroppableComponent } from '../../shared/lib/providers/DragNDrop/ui/DroppableComponent';
import { TasksColumn } from '../../shared/ui/TasksColumn/TasksColumn';
import { TaskCard } from '../../shared/ui/TaskCard/TaskCard';
import { DraggableComponent } from '../../shared/lib/providers/DragNDrop';

const Board = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(getActiveBoard);

  const addNewColumnHandler = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewColumn));
    dispatch(uiActions.showModal());
  };

  return (
    <main className={`board ${classes['board']}`}>
      {activeBoard.columns.map((column: IColumn, columnIndex) => {
        const { tasks } = column;

        return (
          <DroppableComponent key={column.id} droppableId={column.id}>
            <TasksColumn title={column.name} isEmpty={tasks.length === 0} dotNumber={columnIndex % 6}>
              {tasks.map((task, taskIndex) => {
                const { subtasks } = task;
                const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted).length;

                return (
                  <DraggableComponent key={task.id} draggableId={task.id} index={taskIndex}>
                    <TaskCard title={task.title} subtitle={`${completedSubtasks} of ${subtasks.length} subtasks`} />
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
      {/* {activeBoard && activeBoard.columns.map((col: IColumn, index) => <Column key={col.id} index={index} {...col} />)}
      {activeBoard && (
        <Button onClick={addNewColumnHandler} styleClass={ButtonStyle.ADD_COLUMN}>
          + New Column
        </Button>
      )}
      {!activeBoard && <NoBoards />} */}
    </main>
  );
};

export default Board;
