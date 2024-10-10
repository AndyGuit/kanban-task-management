import { useMemo } from 'react';
import { DraggableComponent } from 'src/shared/lib/providers/DragNDrop';
import { ITask } from 'src/shared/types/dataTypes';
import { TaskCard } from 'src/shared/ui';
import { useDispatch } from 'react-redux';
import { DataActions, UIActions } from 'src/app/providers/StoreProvider';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';

interface TaskDraggableProps {
  draggableIndex: number;
  task: ITask;
}

export const TaskDraggable = (props: TaskDraggableProps) => {
  const { draggableIndex, task } = props;
  const { title, id, statusId, subtasks } = task;

  const dispatch = useDispatch();

  const completedSubtasks = useMemo(
    () => subtasks.filter((subtask) => subtask.isCompleted).length,
    [subtasks],
  );

  const viewTaskDetails = (columnId: string, taskId: string) => {
    dispatch(DataActions.setSelectedColumn(columnId));
    dispatch(DataActions.setSelectedTask(taskId));
    dispatch(UIActions.setModalContent(ModalContent.viewTask));
    dispatch(UIActions.showModal());
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
