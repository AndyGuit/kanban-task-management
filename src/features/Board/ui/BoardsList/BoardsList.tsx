import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from '../../../../shared/types/dataTypes';
import Button from '../../../../shared/ui/Button/Button';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';
import { IconBoard } from '../../../../shared/ui/Icons/Icons';
import classes from './BoardsList.module.scss';
import { DataActions, DataSelectors, UIActions } from '../../../../app/providers/StoreProvider';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';

export const BoardsList = () => {
  const dispatch = useDispatch();
  const boards = useSelector(DataSelectors.getAllBoards);

  const setActiveBoard = (boardId: string) => {
    dispatch(DataActions.setActiveBoard(boardId));
  };

  const handleAddBoard = () => {
    dispatch(UIActions.setModalContent(ModalContent.addNewBoard));
    dispatch(UIActions.showModal());
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
            <IconBoard /> {board.name}
          </Button>
        </li>
      ))}
      <Button onClick={handleAddBoard} styleClass={ButtonStyle.CREATE_BOARD}>
        <IconBoard />+ Create New Board
      </Button>
    </ul>
  );
};
