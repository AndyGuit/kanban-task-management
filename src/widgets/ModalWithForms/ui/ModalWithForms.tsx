import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UISelectors, UIActions } from '../../../app/providers/StoreProvider';
import Modal from '../../../shared/ui/Modal/Modal';
import { ModalContent } from '../../../shared/types/modalFormContentTypes';
import { Loader } from '../../../shared/ui/Loader/Loader';

const AddNewBoard = lazy(
  () => import('../../../features/Forms/ui/AddNewBoard'),
);
const AddNewColumn = lazy(
  () => import('../../../features/Forms/ui/AddNewColumn'),
);
const AddNewTask = lazy(() => import('../../../features/Forms/ui/AddNewTask'));
const Confirm = lazy(() => import('../../../features/Forms/ui/Confirm'));
const EditBoard = lazy(() => import('../../../features/Forms/ui/EditBoard'));
const EditTask = lazy(() => import('../../../features/Forms/ui/EditTask'));
const ViewTask = lazy(() => import('../../../features/Forms/ui/ViewTask'));
const MobileMenu = lazy(
  () => import('../../../features/MenuMobile/ui/MenuMobile'),
);

export const ModalWithForms = () => {
  const dispatch = useDispatch();
  const isModal = useSelector(UISelectors.getIsModal);
  const closeModal = () => dispatch(UIActions.hideModal());
  const contentType = useSelector(UISelectors.getModalFormContent);

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
