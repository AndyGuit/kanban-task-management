import { useDispatch } from 'react-redux';
import { ModalContent } from 'src/shared/types';
import { ButtonStyle, Button } from 'src/shared/ui';
import { ModalActions } from 'src/widgets/ModalWithForms';
import classes from './BoardEmpty.module.scss';

export const BoardEmpty = () => {
  const dispatch = useDispatch();

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
