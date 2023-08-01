import Column from '../../components/Column/Column';
import classes from './Board.module.scss';

const Board = () => {
  return (
    <main className={`board ${classes['board']}`}>
      <Column />
      <Column />
    </main>
  );
};

export default Board;
