import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { BoardsActions } from 'src/entities/BoardsSlice';

interface Props {
  children: React.ReactNode;
}

export const DragDropContextProvider = (props: Props) => {
  const { children } = props;
  const dispatch = useDispatch();

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

    // if card dropped on same column
    if (destination.droppableId === source.droppableId) {
      dispatch(BoardsActions.setSelectedColumn(destination.droppableId));
      dispatch(BoardsActions.setSelectedTask(draggableId));
      dispatch(BoardsActions.removeTask(draggableId));
      dispatch(BoardsActions.insertSelectedTask(destination.index));
      dispatch(BoardsActions.saveChanges('column'));
    }

    // if card dropped on other column
    if (destination.droppableId !== source.droppableId) {
      dispatch(BoardsActions.setSelectedColumn(source.droppableId));
      dispatch(BoardsActions.setSelectedTask(draggableId));
      dispatch(BoardsActions.removeTask(draggableId));
      dispatch(BoardsActions.saveChanges('column'));
      dispatch(BoardsActions.setSelectedColumn(destination.droppableId));
      dispatch(BoardsActions.setNewTaskStatus());
      dispatch(BoardsActions.insertSelectedTask(destination.index));
      dispatch(BoardsActions.saveChanges('column'));
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
