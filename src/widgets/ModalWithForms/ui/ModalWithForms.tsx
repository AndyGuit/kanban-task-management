import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';
import { Loader } from 'src/shared/ui/Loader/Loader';
import { Modal } from 'src/shared/ui';
import { ModalActions, ModalSelectors } from '..';

const AddNewBoard = lazy(() => import('src/features/Forms/ui/AddNewBoard'));
const AddNewColumn = lazy(() => import('src/features/Forms/ui/AddNewColumn'));
const AddNewTask = lazy(() => import('src/features/Forms/ui/AddNewTask'));
const Confirm = lazy(() => import('src/features/Forms/ui/Confirm'));
const EditBoard = lazy(() => import('src/features/Forms/ui/EditBoard'));
const EditTask = lazy(() => import('src/features/Forms/ui/EditTask'));
const ViewTask = lazy(() => import('src/features/Forms/ui/ViewTask'));
const MobileMenu = lazy(() => import('src/features/MenuMobile/ui/MenuMobile'));

export const ModalWithForms = () => {
  const dispatch = useDispatch();
  const isModal = useSelector(ModalSelectors.getIsModal);
  const closeModal = () => dispatch(ModalActions.hideModal());
  const contentType = useSelector(ModalSelectors.getModalFormContent);

  if (!isModal) return null;

  let form: React.ReactNode = 'Error When Loading Form';

  switch (contentType) {
    case ModalContent.viewTask:
      form = <ViewTask />;
      break;
    case ModalContent.editTask:
      form = <EditTask />;
      break;
    case ModalContent.addNewTask:
      form = <AddNewTask />;
      break;
    case ModalContent.confirmDeleteTask:
    case ModalContent.confirmDeleteBoard:
      form = <Confirm />;
      break;
    case ModalContent.addNewColumn:
      form = <AddNewColumn />;
      break;
    case ModalContent.addNewBoard:
      form = <AddNewBoard />;
      break;
    case ModalContent.editBoard:
      form = <EditBoard />;
      break;
    case ModalContent.menuMobile:
      form = <MobileMenu />;
      break;
    default:
      form = 'No such form found';
      break;
  }

  return (
    <Modal onClose={closeModal}>
      <Suspense fallback={<Loader />}> {form}</Suspense>
    </Modal>
  );
};
