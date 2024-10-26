import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { boardsServiceRTK } from 'src/shared/lib';

interface Props {
  children: React.ReactNode;
}

export const DragDropContextProviderRTK = (props: Props) => {
  const { children } = props;
  const { data: boards } = boardsServiceRTK.useFetchAllBoardsQuery(null);
  const [deleteTask] = boardsServiceRTK.useDeleteTaskMutation();
  const [insertTask] = boardsServiceRTK.useInsertTaskByIndexMutation();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If user drops outside of the list
    if (!destination) return;

    // if task dropped on the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const activeBoard = boards?.find((board) => board.isActive);
    const task = activeBoard?.columns
      .find((column) => column.id === source.droppableId)
      ?.tasks.find((task) => task.id === draggableId);

    // if card dropped on same column
    if (destination.droppableId === source.droppableId) {
      deleteTask({
        boardId: activeBoard!.id,
        columnId: source.droppableId,
        taskId: draggableId,
      });
      insertTask({
        boardId: activeBoard!.id,
        task: task!,
        index: destination.index,
      });
    }

    // if card dropped on other column
    if (destination.droppableId !== source.droppableId) {
      deleteTask({
        boardId: activeBoard!.id,
        columnId: source.droppableId,
        taskId: task!.id,
      });
      insertTask({
        boardId: activeBoard!.id,
        task: {
          ...task!,
          statusId: destination.droppableId,
        },
        index: destination.index,
      });
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
