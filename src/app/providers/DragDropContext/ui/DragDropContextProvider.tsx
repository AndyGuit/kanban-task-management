import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { dataActions } from '../../../../store/slices/data-slice';

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
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // if card dropped on same column
    if (destination.droppableId === source.droppableId) {
      dispatch(dataActions.setSelectedColumn(destination.droppableId));
      dispatch(dataActions.setSelectedTask(draggableId));
      dispatch(dataActions.removeTask(draggableId));
      dispatch(dataActions.insertSelectedTask(destination.index));
      dispatch(dataActions.saveChanges('column'));
    }

    // if card dropped on other column
    if (destination.droppableId !== source.droppableId) {
      dispatch(dataActions.setSelectedColumn(source.droppableId));
      dispatch(dataActions.setSelectedTask(draggableId));
      dispatch(dataActions.removeTask(draggableId));
      dispatch(dataActions.saveChanges('column'));
      dispatch(dataActions.setSelectedColumn(destination.droppableId));
      dispatch(dataActions.setNewTaskStatus());
      dispatch(dataActions.insertSelectedTask(destination.index));
      dispatch(dataActions.saveChanges('column'));
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
