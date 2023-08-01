import Column from '../../components/Column/Column';
import Button from '../../components/UI/Button';
import classes from './Board.module.scss';

const Board = () => {
  return (
    <main className={`board ${classes['board']}`}>
      <Column />
      <Button btnStyle="add-column">+ New Column</Button>
    </main>
  );
};

export default Board;
