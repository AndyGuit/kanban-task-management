import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from 'src/shared/types/dataTypes';
import { ButtonStyle, Button, Icons } from 'src/shared/ui';
import { DataActions, DataSelectors } from 'src/app/providers/StoreProvider';
import { ModalContent } from 'src/shared/types/modalFormContentTypes';
import { ModalActions } from 'src/widgets/ModalWithForms';
import classes from './BoardsList.module.scss';

export const BoardsList = () => {
  const dispatch = useDispatch();
  const boards = useSelector(DataSelectors.getAllBoards);

  const setActiveBoard = (boardId: string) => {
    dispatch(DataActions.setActiveBoard(boardId));
  };

  const handleAddBoard = () => {
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
