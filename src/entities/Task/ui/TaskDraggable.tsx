import { useMemo } from 'react';
import { DraggableComponent } from '../../../shared/lib/providers/DragNDrop';
import { ITask } from '../../../shared/types/dataTypes';
import { TaskCard } from '../../../shared/ui/TaskCard/TaskCard';
import { useDispatch } from 'react-redux';
import { DataActions, UIActions } from '../../../app/providers/StoreProvider';
import { ModalContent } from '../../../shared/types/modalFormContentTypes';

interface TaskDraggableProps extends ITask {
  taskIndex: number;
}

export const TaskDraggable = (props: TaskDraggableProps) => {
  const { subtasks, taskIndex, title, id, statusId } = props;
  const dispatch = useDispatch();

  const completedSubtasks = useMemo(() => subtasks.filter((subtask) => subtask.isCompleted).length, [subtasks]);

  const viewTaskDetails = (columnId: string, taskId: string) => {
    dispatch(DataActions.setSelectedColumn(columnId));
    dispatch(DataActions.setSelectedTask(taskId));
    dispatch(UIActions.setModalContent(ModalContent.viewTask));
    dispatch(UIActions.showModal());
  };

  return (
    <DraggableComponent key={id} draggableId={id} index={taskIndex}>
      <TaskCard
        onClick={() => viewTaskDetails(statusId, id)}
        title={title}
        subtitle={`${completedSubtasks} of ${subtasks.length} subtasks`}
      />
    </DraggableComponent>
  );
};
