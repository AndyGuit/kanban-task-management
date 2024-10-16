import { useDispatch } from 'react-redux';
import { ButtonStyle, Icons, Button, Popover } from 'src/shared/ui';
import { ModalContent } from 'src/shared/lib';
import { ModalActions } from 'src/entities/ModalSlice';

export const PopupEditTask = () => {
  const dispatch = useDispatch();

  const editTaskHandler = () => {
    dispatch(ModalActions.setModalContent(ModalContent.editTask));
  };

  const deleteTaskHandler = () => {
    dispatch(ModalActions.setModalContent(ModalContent.confirmDeleteTask));
  };

  return (
    <Popover
      trigger={
        <Button styleClass={ButtonStyle.POPUP}>
          <Icons.PopupDots />
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
