import { useDispatch } from 'react-redux';
import Button from '../../shared/ui/Button/Button';
import { uiActions } from '../../store/slices/ui-slice';
import { ModalContent } from '../../shared/types/modalFormContentTypes';

import classes from './Board.module.scss';
import { ButtonStyle } from '../../shared/ui/Button/buttonStyles';

const NoBoards = () => {
  const dispatch = useDispatch();

  const handleAddBoard = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewBoard));
    dispatch(uiActions.showModal());
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

export default NoBoards;
