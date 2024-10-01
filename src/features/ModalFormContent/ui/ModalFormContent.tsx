import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { ModalContent } from '../../../shared/types/modalFormContentTypes';
import { UISelectors } from '../../../app/providers/StoreProvider';

const AddNewBoard = lazy(() => import('./Forms/AddNewBoard'));
const AddNewColumn = lazy(() => import('./Forms/AddNewColumn'));
const AddNewTask = lazy(() => import('./Forms/AddNewTask'));
const Confirm = lazy(() => import('./Forms/Confirm'));
const EditBoard = lazy(() => import('./Forms/EditBoard'));
const EditTask = lazy(() => import('./Forms/EditTask'));
const SidebarMobile = lazy(() => import('./Forms/SidebarMobile'));
const ViewTask = lazy(() => import('./Forms/ViewTask'));

/**
 * @description
 * The goal of this component
 * is to simply return the content for modal
 * based on 'modal.formContent' value in global state.
 * We set this global state from different parts of UI
 * */

const ModalContentForm = () => {
  const contentType = useSelector(UISelectors.getModalFormContent);

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

  return <Suspense fallback="Loading...">{content}</Suspense>;
};
export default ModalContentForm;
