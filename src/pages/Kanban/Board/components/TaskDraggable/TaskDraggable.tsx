import { useMemo } from 'react';
import {
  DraggableComponent,
  ModalContent,
  useAppDispatch,
} from 'src/shared/lib';
import { TaskCard } from 'src/shared/ui';
import { BoardsActions } from 'src/entities/BoardsSlice';
import { ModalActions } from 'src/entities/ModalSlice';

interface TaskDraggableProps {
  draggableIndex: number;
  task: ITask;
}

export const TaskDraggable = (props: TaskDraggableProps) => {
  const { draggableIndex, task } = props;
  const { title, id, statusId, subtasks } = task;

  const dispatch = useAppDispatch();

  const completedSubtasks = useMemo(
    () => subtasks.filter((subtask) => subtask.isCompleted).length,
    [subtasks],
  );

  const viewTaskDetails = (columnId: string, taskId: string) => {
    // dispatch(BoardsActions.setSelectedColumn(columnId));
    // dispatch(BoardsActions.setSelectedTask(taskId));
    dispatch(BoardsActions.setColumnId(columnId));
    dispatch(BoardsActions.setTaskId(taskId));
    dispatch(ModalActions.setModalContent(ModalContent.viewTask));
    dispatch(ModalActions.showModal());
  };

  return (
    <DraggableComponent key={id} draggableId={id} index={draggableIndex}>
      <TaskCard
        onClick={() => viewTaskDetails(statusId, id)}
        title={title}
        subtitle={`${completedSubtasks} of ${subtasks.length} subtasks`}
      />
    </DraggableComponent>
  );
};
