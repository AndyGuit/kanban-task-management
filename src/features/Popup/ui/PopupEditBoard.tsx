import { useDispatch } from 'react-redux';
import {
  ButtonStyle,
  Button,
  Icons,
  Popover,
  PopoverContentPosition,
} from 'src/shared/ui';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';
import { ModalActions } from 'src/widgets/ModalWithForms';

export const PopupEditBoard = () => {
  const dispatch = useDispatch();

  const handleEditBoard = () => {
    dispatch(ModalActions.setModalContent(ModalContent.editBoard));
    dispatch(ModalActions.showModal());
  };

  const handleDeleteBoard = () => {
    dispatch(ModalActions.setModalContent(ModalContent.confirmDeleteBoard));
    dispatch(ModalActions.showModal());
  };

  return (
    <Popover
      direction={PopoverContentPosition.BOTTOM_LEFT}
      trigger={
        <Button styleClass={ButtonStyle.POPUP}>
          <Icons.PopupDots />
        </Button>
      }
    >
      <Button onClick={handleEditBoard} styleClass={ButtonStyle.TEXT_PRIMARY}>
        Edit Board
      </Button>
      <Button onClick={handleDeleteBoard} styleClass={ButtonStyle.TEXT_WARNING}>
        Delete Board
      </Button>
    </Popover>
  );
};
