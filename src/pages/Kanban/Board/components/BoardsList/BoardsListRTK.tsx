import { boardsServiceRTK, ModalContent, useAppDispatch } from 'src/shared/lib';
import { ButtonStyle, Button, Icons } from 'src/shared/ui';
import { ModalActions } from 'src/entities/ModalSlice';
import classes from './BoardsList.module.scss';

export const BoardsListRTK = () => {
  const dispatch = useAppDispatch();
  const {
    data: boards,
    isLoading,
    error,
  } = boardsServiceRTK.useFetchAllBoardsQuery(null);
  const [updateBoards] = boardsServiceRTK.useUpdateAllBoardsMutation();

  const setActiveBoard = (boardId: string) => {
    const updatedBoards = boards?.map((board) =>
      board.id === boardId
        ? { ...board, isActive: true }
        : { ...board, isActive: false },
    );

    updateBoards(updatedBoards!);
  };

  const handleAddBoard = () => {
    dispatch(ModalActions.setModalContent(ModalContent.addNewBoard));
    dispatch(ModalActions.showModal());
  };

  return (
    <ul className={classes['boards-list']}>
      {boards?.map((board: IBoard) => (
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
      {isLoading || error ? null : (
        <Button onClick={handleAddBoard} styleClass={ButtonStyle.CREATE_BOARD}>
          <Icons.Board />+ Create New Board
        </Button>
      )}
    </ul>
  );
};
