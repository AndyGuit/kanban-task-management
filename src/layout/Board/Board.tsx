import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColumnComponent from '../../components/Column/Column';
import Button from '../../components/UI/Button';
import { getActiveBoard } from '../../store/selectors/data-selectors';
import { uiActions } from '../../store/slices/ui-slice';
import { IColumn } from '../../types/dataTypes';
import { ModalContent } from '../../types/modalFormContentTypes';
import classes from './Board.module.scss';
import NoBoards from './NoBoards';

const Column = memo(ColumnComponent);

const Board = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(getActiveBoard);

  const addNewColumnHandler = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewColumn));
    dispatch(uiActions.showModal());
  };

  return (
    <main className={`board ${classes['board']}`}>
      {activeBoard &&
        activeBoard.columns.map((col: IColumn, index) => (
          <Column key={col.id} index={index} {...col} />
        ))}
      {activeBoard && (
        <Button onClick={addNewColumnHandler} btnStyle="add-column">
          + New Column
        </Button>
      )}
      {!activeBoard && <NoBoards />}
    </main>
  );
};

export default Board;
