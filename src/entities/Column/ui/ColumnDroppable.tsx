import { DroppableComponent } from 'src/shared/lib/providers/DragNDrop';
import { IColumn } from 'src/shared/types/dataTypes';
import { TasksColumn } from 'src/shared/ui/TasksColumn/TasksColumn';

interface Props {
  children?: React.ReactNode;
  column: IColumn;
  index: number;
}

export const ColumnDroppable = (props: Props) => {
  const { children, column, index } = props;
  const columnTitle = `${column.name}(${column.tasks.length})`;

  return (
    <DroppableComponent key={column.id} droppableId={column.id}>
      <TasksColumn
        title={columnTitle}
        isEmpty={column.tasks.length === 0}
        dotNumber={index % 6}
      >
        {children}
      </TasksColumn>
    </DroppableComponent>
  );
};
