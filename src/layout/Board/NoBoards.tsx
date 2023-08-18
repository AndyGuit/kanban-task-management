import { useDispatch } from 'react-redux';
import Button from '../../components/UI/Button';
import { uiActions } from '../../store/slices/ui-slice';
import { ModalContent } from '../../types/modalFormContentTypes';

import classes from './Board.module.scss';

const NoBoards = () => {
  const dispatch = useDispatch();

  const handleAddBoard = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewBoard));
    dispatch(uiActions.showModal());
  };

  return (
    <div className={classes['board--empty']}>
      <p>You don't have boards. Please, create board to get started.</p>
      <Button onClick={handleAddBoard} btnStyle="add-task">
        + Create New Board
      </Button>
    </div>
  );
};

export default NoBoards;
