import { useDispatch } from 'react-redux';
import Button from '../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../shared/ui/Button/buttonStyles';
import { IconPopupDots } from '../../../shared/ui/Icons/Icons';
import { Popover, PopoverContentPosition } from '../../../shared/ui/Popover';
import { UIActions } from '../../../app/providers/StoreProvider';
import { ModalContent } from '../../../shared/types/modalFormContentTypes';

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
          <IconPopupDots />
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
