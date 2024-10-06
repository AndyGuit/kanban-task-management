export interface ISubtask {
  isCompleted: boolean;
  title: string;
}

export interface ITask {
  description: string;
  id: string;
  status: string;
  statusId: string;
  subtasks: ISubtask[];
  title: string;
}

export interface IColumn {
  id: string;
  name: string;
  tasks: ITask[];
}

export interface IBoard {
  id: string;
  name: string;
  columns: IColumn[];
  isActive: boolean;
}
