import { useDispatch, useSelector } from 'react-redux';
import { ModalContent } from 'src/shared/lib';
import { ButtonStyle, Button } from 'src/shared/ui';
import { BoardsActions, BoardsSelectors } from 'src/entities/BoardsSlice';
import { ModalActions, ModalSelectors } from 'src/entities/ModalSlice';
import classes from './Form.module.scss';

const Confirm = () => {
  const dispatch = useDispatch();
  const deletionType = useSelector(ModalSelectors.getModalFormContent);
  const selectedTask = useSelector(BoardsSelectors.getSelectedTask);
  const selectedBoard = useSelector(BoardsSelectors.getActiveBoard);

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
          <span>&apos;{selectedTask.title}&apos;</span> task? This action will
          remove all subtasks and cannot be reversed.
        </p>
      );

      onConfirm = () => {
        dispatch(BoardsActions.removeTask(selectedTask.id));
        dispatch(BoardsActions.saveChanges('column'));
        dispatch(ModalActions.hideModal());
      };
      break;
    case ModalContent.confirmDeleteBoard:
      headerName = 'board';
      description = (
        <p className={`form-description ${classes['form-description']}`}>
          Are you sure you want to delete the{' '}
          <span>&apos;{selectedBoard?.name}&apos;</span> board? This action will
          remove all columns and tasks and cannot be reversed.
        </p>
      );

      onConfirm = () => {
        dispatch(BoardsActions.deleteActiveBoard());
        dispatch(BoardsActions.saveChanges('board'));
        dispatch(ModalActions.hideModal());
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
