import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Column from '../../components/Column/Column';
import Button from '../../components/UI/Button';
import { RootState } from '../../store/index';
import { uiActions } from '../../store/slices/ui-slice';
import { IColumn } from '../../types/dataTypes';
import { ModalContent } from '../../types/modalFormContentTypes';
import classes from './Board.module.scss';

const Board = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);

  const addNewColumnHandler = () => {
    dispatch(uiActions.setModalContent(ModalContent.addNewColumn));
    dispatch(uiActions.showModal());
  };

  return (
    <main className={`board ${classes['board']}`}>
      {activeBoard.columns.map((col: IColumn, index) => (
        <Column key={col.id} index={index} {...col} />
      ))}
      <Button onClick={addNewColumnHandler} btnStyle="add-column">
        + New Column
      </Button>
    </main>
  );
};

export default Board;
