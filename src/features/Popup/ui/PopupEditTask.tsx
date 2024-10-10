import { useDispatch } from 'react-redux';
import { ButtonStyle, Icons, Button, Popover } from 'src/shared/ui';
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
