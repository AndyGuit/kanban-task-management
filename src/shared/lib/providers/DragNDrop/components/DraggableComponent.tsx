import { Draggable } from 'react-beautiful-dnd';

interface Props {
  children: React.ReactNode;
  draggableId: string;
  index: number;
}

export const DraggableComponent = (props: Props) => {
  const { children, draggableId, index } = props;

  return (
    <Draggable draggableId={draggableId} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
          {children}
        </div>
      )}
    </Draggable>
  );
};
