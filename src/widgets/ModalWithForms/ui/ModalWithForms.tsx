import { useDispatch, useSelector } from 'react-redux';
import { UISelectors, UIActions } from '../../../app/providers/StoreProvider';
import Modal from '../../../shared/ui/Modal/Modal';
import ModalContentForm from '../../../features/ModalFormContent/ui/ModalFormContent';

export const ModalWithForms = () => {
  const dispatch = useDispatch();
  const isModal = useSelector(UISelectors.getIsModal);
  const closeModal = () => dispatch(UIActions.hideModal());

  if (!isModal) return null;

  return (
    <Modal onClose={closeModal}>
      <ModalContentForm />
    </Modal>
  );
};
