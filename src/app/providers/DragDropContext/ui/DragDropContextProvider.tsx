import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { DataActions } from '../../StoreProvider';

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
      dispatch(DataActions.setSelectedColumn(destination.droppableId));
      dispatch(DataActions.setSelectedTask(draggableId));
      dispatch(DataActions.removeTask(draggableId));
      dispatch(DataActions.insertSelectedTask(destination.index));
      dispatch(DataActions.saveChanges('column'));
    }

    // if card dropped on other column
    if (destination.droppableId !== source.droppableId) {
      dispatch(DataActions.setSelectedColumn(source.droppableId));
      dispatch(DataActions.setSelectedTask(draggableId));
      dispatch(DataActions.removeTask(draggableId));
      dispatch(DataActions.saveChanges('column'));
      dispatch(DataActions.setSelectedColumn(destination.droppableId));
      dispatch(DataActions.setNewTaskStatus());
      dispatch(DataActions.insertSelectedTask(destination.index));
      dispatch(DataActions.saveChanges('column'));
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
