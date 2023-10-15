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

  // The goal of this component
  // is to simply return the content for modal
  // based on 'modal.formContent' value in global state.
  // We set this global state from different parts of UI

  let content: React.ReactNode = 'No Modal Content were added';

  switch (contentType) {
    case ModalContent.viewTask:
      // set by clicking on any of the task
      content = <ViewTask />;
      break;
    case ModalContent.editTask:
      // set by clicking 'edit task' button
      // in 'ViewTask' component in popup window
      content = <EditTask />;
      break;
    case ModalContent.addNewTask:
      // set by clicking 'add new task' button
      // in top left corner of header
      content = <AddNewTask />;
      break;
    case ModalContent.confirmDeleteTask:
    case ModalContent.confirmDeleteBoard:
      // set by clicking button 'delete (task || board)'
      // in top left corner of header
      // or in 'ViewTask' component in popup window
      content = <Confirm />;
      break;
    case ModalContent.addNewColumn:
      // set by clicking button 'new column'
      // in the right side of border
      content = <AddNewColumn />;
      break;
    case ModalContent.addNewBoard:
      // set by clicking button 'create new board'
      // in sidebar
      content = <AddNewBoard />;
      break;
    case ModalContent.editBoard:
      // set by clicking button 'edit board'
      // in top left corner of header
      content = <EditBoard />;
      break;
    case ModalContent.sidebarMobile:
      // this modal viewed only on mobile devices
      // set by clicking chevron down button
      // in header near board name
      content = <SidebarMobile />;
      break;
    default:
      break;
  }

  return <Fragment>{content}</Fragment>;
};

export default ModalContentForm;
