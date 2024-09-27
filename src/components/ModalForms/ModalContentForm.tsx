import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { getModalFormContent } from '../../store/selectors/ui-selectors';
import { ModalContent } from '../../types/modalFormContentTypes';
const AddNewBoard = lazy(() => import('./AddNewBoard'));
const AddNewColumn = lazy(() => import('./AddNewColumn'));
const AddNewTask = lazy(() => import('./AddNewTask'));
const Confirm = lazy(() => import('./Confirm'));
const EditBoard = lazy(() => import('./EditBoard'));
const EditTask = lazy(() => import('./EditTask'));
const SidebarMobile = lazy(() => import('./SidebarMobile'));
const ViewTask = lazy(() => import('./ViewTask'));

const ModalContentForm = () => {
  const contentType = useSelector(getModalFormContent);

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

  return <Suspense fallback="Loading...">{content}</Suspense>;
};

export default ModalContentForm;
