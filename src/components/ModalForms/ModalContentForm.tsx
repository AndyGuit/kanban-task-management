import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ModalContent } from '../../types/modalFormContentTypes';
import AddNewBoard from './AddNewBoard';
import AddNewColumn from './AddNewColumn';
import AddNewTask from './AddNewTask';
import Confirm from './Confirm';
import EditBoard from './EditBoard';
import EditTask from './EditTask';
import SidebarMobile from './SidebarMobile';
import ViewTask from './ViewTask';

const ModalContentForm = () => {
  const contentType = useSelector(
    (state: RootState) => state.ui.modal.formContent
  );

  let content: React.ReactNode = 'No Modal Content were added';

  switch (contentType) {
    case ModalContent.viewTask:
      content = <ViewTask />;
      break;
    case ModalContent.editTask:
      content = <EditTask />;
      break;
    case ModalContent.addNewTask:
      content = <AddNewTask />;
      break;
    case ModalContent.confirmDeleteTask:
    case ModalContent.confirmDeleteBoard:
      content = <Confirm />;
      break;
    case ModalContent.addNewColumn:
      content = <AddNewColumn />;
      break;
    case ModalContent.addNewBoard:
      content = <AddNewBoard />;
      break;
    case ModalContent.editBoard:
      content = <EditBoard />;
      break;
    case ModalContent.sidebarMobile:
      content = <SidebarMobile />;
      break;
    default:
      break;
  }

  return <Fragment>{content}</Fragment>;
};

export default ModalContentForm;
