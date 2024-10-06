import { useDispatch } from 'react-redux';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';
import Button from '../../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';
import classes from './BoardEmpty.module.scss';
import { UIActions } from '../../../../app/providers/StoreProvider';

export const BoardEmpty = () => {
  const dispatch = useDispatch();

  const handleAddBoard = () => {
    dispatch(UIActions.setModalContent(ModalContent.addNewBoard));
    dispatch(UIActions.showModal());
  };

  return (
    <div className={classes['board--empty']}>
      <p>You don't have boards. Please, create board to get started.</p>
      <Button onClick={handleAddBoard} styleClass={ButtonStyle.ADD_TASK}>
        + Create New Board
      </Button>
    </div>
  );
};
