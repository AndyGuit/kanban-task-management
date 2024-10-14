import { useMemo } from 'react';
import { DraggableComponent, ModalContent } from 'src/shared/lib';
import { ITask } from 'src/shared/types';
import { TaskCard } from 'src/shared/ui';
import { useDispatch } from 'react-redux';
import { DataActions } from 'src/app/providers';
import { ModalActions } from 'src/widgets/ModalWithForms';

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
