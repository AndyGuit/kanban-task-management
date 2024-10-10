import { useDispatch } from 'react-redux';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';
import Button from 'src/shared/ui/Button/Button';
import { ButtonStyle } from 'src/shared/ui/Button/buttonStyles';
import classes from './BoardEmpty.module.scss';
import { UIActions } from 'src/app/providers/StoreProvider';

export const BoardEmpty = () => {
  const dispatch = useDispatch();

  const handleAddBoard = () => {
    dispatch(UIActions.setModalContent(ModalContent.addNewBoard));
    dispatch(UIActions.showModal());
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
