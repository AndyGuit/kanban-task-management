import { useSelector } from 'react-redux';
import Column from '../../components/Column/Column';
import Button from '../../components/UI/Button';
import { RootState } from '../../store/index';
import { IColumn } from '../../types/dataTypes';
import classes from './Board.module.scss';

const Board = () => {
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);

  return (
    <main className={`board ${classes['board']}`}>
      {activeBoard.columns.map((col: IColumn, index) => (
        <Column key={col.id} index={index} {...col} />
      ))}
      <Button btnStyle="add-column">+ New Column</Button>
    </main>
  );
};

export default Board;
