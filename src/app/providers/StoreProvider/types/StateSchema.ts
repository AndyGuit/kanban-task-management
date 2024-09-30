import { AppTheme } from '../../../../shared/types/appThemes';
import { IBoard, IColumn, ITask } from '../../../../shared/types/dataTypes';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';

export interface UIStateSchema {
  appTheme: AppTheme; // 'dark' | 'light'
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
}
