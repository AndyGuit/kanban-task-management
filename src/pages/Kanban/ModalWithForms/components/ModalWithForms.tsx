import { Suspense } from 'react';
import { ModalContent, useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Loader } from 'src/shared/ui';
import { Modal } from 'src/shared/ui';
import { ModalActions, ModalSelectors } from 'src/entities/ModalSlice';
import { MenuMobile } from './MenuMobile/MenuMobile.async';
import * as Form from './Forms/Forms.async';

export const ModalWithForms = () => {
  const dispatch = useAppDispatch();
  const isModal = useAppSelector(ModalSelectors.getIsModal);
  const closeModal = () => dispatch(ModalActions.hideModal());
  const contentType = useAppSelector(ModalSelectors.getModalFormContent);

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
