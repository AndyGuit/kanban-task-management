import { useDispatch, useSelector } from 'react-redux';
import Column from '../../components/Column/Column';
import Button from '../../shared/ui/Button/Button';
import { getActiveBoard } from '../../store/selectors/data-selectors';
import { uiActions } from '../../store/slices/ui-slice';
import { IColumn } from '../../shared/types/dataTypes';
import { ModalContent } from '../../shared/types/modalFormContentTypes';
import classes from './Board.module.scss';
import NoBoards from './NoBoards';
import { ButtonStyle } from '../../shared/ui/Button/buttonStyles';

const Board = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(getActiveBoard);

  const addNewColumnHandler = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewColumn));
    dispatch(uiActions.showModal());
  };

  return (
    <main className={`board ${classes['board']}`}>
      {activeBoard && activeBoard.columns.map((col: IColumn, index) => <Column key={col.id} index={index} {...col} />)}
      {activeBoard && (
        <Button onClick={addNewColumnHandler} styleClass={ButtonStyle.ADD_COLUMN}>
          + New Column
        </Button>
      )}
      {!activeBoard && <NoBoards />}
    </main>
  );
};

export default Board;
