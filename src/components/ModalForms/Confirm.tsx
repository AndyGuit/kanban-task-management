import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { ModalContent } from '../../types/modalFormContentTypes';
import Button from '../UI/Button';
import classes from './Form.module.scss';

const Confirm = () => {
  const dispatch = useDispatch();
  const deletionType = useSelector(
    (state: RootState) => state.ui.modal.formContent
  );
  const selectedTask = useSelector(
    (state: RootState) => state.data.selectedTask
  );
  const selectedBoard = useSelector(
    (state: RootState) => state.data.activeBoard
  );

  let headerName = '';
  let descriptionText = '';

  const onCancel = () => dispatch(uiActions.hideModal());
  let onConfirm = () => {};

  switch (deletionType) {
    case ModalContent.confirmDeleteTask:
      headerName = 'task';
      descriptionText = `Are you sure you want to delete the '${selectedTask.title}' task? This
        action will remove all subtasks and cannot be reversed.`;

      onConfirm = () => {
        dispatch(dataActions.removeTask(selectedTask.id));
        dispatch(dataActions.saveChanges('column'));
        dispatch(uiActions.hideModal());
      };
      break;
    case ModalContent.confirmDeleteBoard:
      headerName = 'board';
      descriptionText = `Are you sure you want to delete the '${selectedBoard.name}' board? This
        action will remove all columns and tasks and cannot be reversed.`;
      break;

    default:
      break;
  }

  return (
    <div className={`form ${classes.form}`}>
      <h3 className={classes['form-warning-text']}>
        Delete this {headerName}?
      </h3>
      <p className={`form-description ${classes['form-description']}`}>
        {descriptionText}
      </p>
      <div className={classes['form-confirm-buttons']}>
        <Button onClick={onConfirm} btnStyle="form-warning">
          Delete
        </Button>
        <Button onClick={onCancel} btnStyle="form-secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
