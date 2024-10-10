import { AppTheme } from 'src/shared/types/appThemes';
import { IBoard, IColumn, ITask } from 'src/shared/types/dataTypes';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';

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
