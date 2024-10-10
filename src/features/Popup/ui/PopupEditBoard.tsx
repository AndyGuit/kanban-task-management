import { useDispatch } from 'react-redux';
import {
  ButtonStyle,
  Button,
  Icons,
  Popover,
  PopoverContentPosition,
} from 'src/shared/ui';
import { UIActions } from 'src/app/providers/StoreProvider';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';

export const PopupEditBoard = () => {
  const dispatch = useDispatch();

  const handleEditBoard = () => {
    dispatch(UIActions.setModalContent(ModalContent.editBoard));
    dispatch(UIActions.showModal());
  };

  const handleDeleteBoard = () => {
    dispatch(UIActions.setModalContent(ModalContent.confirmDeleteBoard));
    dispatch(UIActions.showModal());
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
