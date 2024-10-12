import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

interface Props {
  children: React.ReactNode;
  droppableId: string;
}

export const DroppableComponent = (props: Props) => {
  const { children, droppableId } = props;

  return (
    <Droppable droppableId={droppableId}>
      {(provided: DroppableProvided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
