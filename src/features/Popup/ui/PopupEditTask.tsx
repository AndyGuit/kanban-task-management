import { useDispatch } from 'react-redux';
import Button from '../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../shared/ui/Button/buttonStyles';
import { IconPopupDots } from '../../../shared/ui/Icons/Icons';
import { Popover } from '../../../shared/ui/Popover';
import { UIActions } from '../../../app/providers/StoreProvider';
import { ModalContent } from '../../../shared/types/modalFormContentTypes';

export const PopupEditTask = () => {
  const dispatch = useDispatch();

  const editTaskHandler = () => {
    dispatch(UIActions.setModalContent(ModalContent.editTask));
  };

  const deleteTaskHandler = () => {
    dispatch(UIActions.setModalContent(ModalContent.confirmDeleteTask));
  };

  return (
    <Popover
      trigger={
        <Button styleClass={ButtonStyle.POPUP}>
          <IconPopupDots />
        </Button>
      }
    >
      <Button onClick={editTaskHandler} styleClass={ButtonStyle.TEXT_PRIMARY}>
        Edit Task
      </Button>
      <Button onClick={deleteTaskHandler} styleClass={ButtonStyle.TEXT_WARNING}>
        Delete Task
      </Button>
    </Popover>
  );
};
