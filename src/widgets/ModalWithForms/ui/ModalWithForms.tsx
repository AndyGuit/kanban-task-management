import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContent } from 'src/shared/types';
import { Loader } from 'src/shared/ui';
import { Modal } from 'src/shared/ui';
import { ModalActions, ModalSelectors } from '..';
import { MenuMobile } from 'src/features/MenuMobile';
import * as Form from 'src/features/Forms';

export const ModalWithForms = () => {
  const dispatch = useDispatch();
  const isModal = useSelector(ModalSelectors.getIsModal);
  const closeModal = () => dispatch(ModalActions.hideModal());
  const contentType = useSelector(ModalSelectors.getModalFormContent);

  if (!isModal) return null;

  let form: React.ReactNode = 'Error When Loading Form';

  switch (contentType) {
    case ModalContent.viewTask:
      form = <Form.ViewTask />;
      break;
    case ModalContent.editTask:
      form = <Form.EditTask />;
      break;
    case ModalContent.addNewTask:
      form = <Form.AddNewTask />;
      break;
    case ModalContent.confirmDeleteTask:
    case ModalContent.confirmDeleteBoard:
      form = <Form.Confirm />;
      break;
    case ModalContent.addNewColumn:
      form = <Form.AddNewColumn />;
      break;
    case ModalContent.addNewBoard:
      form = <Form.AddNewBoard />;
      break;
    case ModalContent.editBoard:
      form = <Form.EditBoard />;
      break;
    case ModalContent.menuMobile:
      form = <MenuMobile />;
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
