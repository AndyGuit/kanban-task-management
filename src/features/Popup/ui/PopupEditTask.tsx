import { useDispatch } from 'react-redux';
import Button from 'src/shared/ui/Button/Button';
import { ButtonStyle } from 'src/shared/ui/Button/buttonStyles';
import { IconPopupDots } from 'src/shared/ui/Icons/Icons';
import { Popover } from 'src/shared/ui/Popover';
import { UIActions } from 'src/app/providers/StoreProvider';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';

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
