declare interface ISubtask {
  isCompleted: boolean;
  title: string;
}

declare interface ITask {
  description: string;
  id: string;
  status: string;
  statusId: string;
  subtasks: ISubtask[];
  title: string;
}

declare interface IColumn {
  id: string;
  name: string;
  tasks: ITask[];
}

declare interface IBoard {
  id: string;
  name: string;
  columns: IColumn[];
  isActive: boolean;
}
