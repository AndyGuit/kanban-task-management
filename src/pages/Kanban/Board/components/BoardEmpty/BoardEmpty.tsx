import { ModalContent, useAppDispatch } from 'src/shared/lib';
import { ButtonStyle, Button } from 'src/shared/ui';
import { ModalActions } from 'src/entities/ModalSlice';
import classes from './BoardEmpty.module.scss';

export const BoardEmpty = () => {
  const dispatch = useAppDispatch();

  const handleAddBoard = () => {
    dispatch(ModalActions.setModalContent(ModalContent.addNewBoard));
    dispatch(ModalActions.showModal());
  };

  return (
    <div className={classes['board--empty']}>
      <p>You don&apos;t have boards. Please, create board to get started.</p>
      <Button onClick={handleAddBoard} styleClass={ButtonStyle.ADD_TASK}>
        + Create New Board
      </Button>
    </div>
  );
};
