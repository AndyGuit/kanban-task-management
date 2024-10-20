import { useDispatch, useSelector } from 'react-redux';
import { ModalContent, useAppSelector } from 'src/shared/lib';
import { ButtonStyle, Button, Icons } from 'src/shared/ui';
import { BoardsActions, BoardsSelectors } from 'src/entities/BoardsSlice';
import { ModalActions } from 'src/entities/ModalSlice';
import classes from './BoardsList.module.scss';

export const BoardsList = () => {
  const dispatch = useDispatch();
  const boards = useSelector(BoardsSelectors.getAllBoards);
  const { isLoading, error } = useAppSelector((state) => state.boards);

  const setActiveBoard = (boardId: string) => {
    if (isLoading || error) return;

    dispatch(BoardsActions.setActiveBoard(boardId));
  };

  const handleAddBoard = () => {
    if (isLoading || error) return;

    dispatch(ModalActions.setModalContent(ModalContent.addNewBoard));
    dispatch(ModalActions.showModal());
  };

  return (
    <ul className={classes['boards-list']}>
      {boards.map((board: IBoard) => (
        <li key={board.id}>
          <Button
            onClick={setActiveBoard.bind(null, board.id)}
            styleClass={ButtonStyle.SELECT_BOARD}
            isActive={board.isActive}
          >
            <Icons.Board /> {board.name}
          </Button>
        </li>
      ))}
      <Button onClick={handleAddBoard} styleClass={ButtonStyle.CREATE_BOARD}>
        <Icons.Board />+ Create New Board
      </Button>
    </ul>
  );
};
