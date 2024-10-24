import {
  boardsServiceRTK,
  ModalContent,
  useAppDispatch,
  useAppSelector,
} from 'src/shared/lib';
import { ButtonStyle, Button } from 'src/shared/ui';
import { ModalActions, ModalSelectors } from 'src/entities/ModalSlice';
import classes from './Form.module.scss';

const Confirm = () => {
  const dispatch = useAppDispatch();
  const [deleteBoard] = boardsServiceRTK.useDeleteBoardMutation();
  const [deleteTask] = boardsServiceRTK.useDeleteTaskMutation();
  const { data: boards } = boardsServiceRTK.useFetchAllBoardsQuery(null);
  const activeBoard = boards?.find((board) => board.isActive);
  const deletionType = useAppSelector(ModalSelectors.getModalFormContent);
  const { columnId, taskId } = useAppSelector((state) => state.boards);
  const { data: selectedTask } = boardsServiceRTK.useGetTaskByIdQuery({
    boardId: activeBoard?.id || '',
    columnId,
    taskId,
  });

  let headerName = '';
  let description: React.ReactNode;

  const onCancel = () => dispatch(ModalActions.hideModal());
  let onConfirm = () => {};

  switch (deletionType) {
    case ModalContent.confirmDeleteTask:
      headerName = 'task';
      description = (
        <p className={`form-description ${classes['form-description']}`}>
          Are you sure you want to delete the{' '}
          <span>&apos;{selectedTask!.title}&apos;</span> task? This action will
          remove all subtasks and cannot be reversed.
        </p>
      );

      onConfirm = () => {
        deleteTask({
          boardId: activeBoard?.id || '',
          columnId: selectedTask!.statusId,
          taskId: selectedTask!.id,
        });
        dispatch(ModalActions.hideModal());
      };
      break;
    case ModalContent.confirmDeleteBoard:
      headerName = 'board';
      description = (
        <p className={`form-description ${classes['form-description']}`}>
          Are you sure you want to delete the{' '}
          <span>&apos;{activeBoard?.name}&apos;</span> board? This action will
          remove all columns and tasks and cannot be reversed.
        </p>
      );

      onConfirm = () => {
        if (activeBoard?.id) {
          deleteBoard(activeBoard?.id);
          dispatch(ModalActions.hideModal());
        }
      };
      break;
    default:
      break;
  }

  return (
    <div className={`form ${classes.form}`}>
      <h3 className={classes['form-warning-text']}>
        Delete this {headerName}?
      </h3>
      {description}
      <div className={classes['form-confirm-buttons']}>
        <Button onClick={onConfirm} styleClass={ButtonStyle.FORM_WARNING}>
          Delete
        </Button>
        <Button onClick={onCancel} styleClass={ButtonStyle.FORM_SECONDARY}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
