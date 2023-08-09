import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ModalContent } from '../../types/modalFormContentTypes';
import ViewTask from './ViewTask/ViewTask';

const ModalContentForm = () => {
  const contentType = useSelector(
    (state: RootState) => state.ui.modal.formContent
  );

  let content: React.ReactNode = 'No Modal Content were added';

  switch (contentType) {
    case ModalContent.viewTask:
      content = <ViewTask />;
      break;
    default:
      break;
  }

  return <Fragment>{content}</Fragment>;
};

export default ModalContentForm;
