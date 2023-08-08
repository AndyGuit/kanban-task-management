import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ModalContent } from '../../types/modalFormContentTypes';
import ViewCard from './ViewCard/ViewCard';

const ModalContentForm = () => {
  const contentType = useSelector(
    (state: RootState) => state.ui.modal.formContent
  );

  let content: React.ReactNode = 'No Modal Content were added';

  switch (contentType) {
    case ModalContent.viewCard:
      content = <ViewCard />;
      break;
    default:
      break;
  }

  return <Fragment>{content}</Fragment>;
};

export default ModalContentForm;
