import { AppTheme } from 'src/features/ThemeToggle';
import { ModalContent } from 'src/shared/lib';

export interface UIStateSchema {
  hasSidebar: boolean;
  modal: {
    isVisible: boolean;
    formContent: ModalContent;
  };
}

export interface DataSchema {
  boards: IBoard[];
  activeBoard: IBoard;
  selectedTask: ITask;
  selectedColumn: IColumn;
}

export interface StateSchema {
  ui: UIStateSchema;
  data: DataSchema;
  theme: AppTheme;
}
