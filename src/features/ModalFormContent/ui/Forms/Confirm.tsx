import { useDispatch, useSelector } from 'react-redux';
import { getActiveBoard, getSelectedTask } from '../../../../store/selectors/data-selectors';
import { getModalFormContent } from '../../../../store/selectors/ui-selectors';
import { dataActions } from '../../../../store/slices/data-slice';
import { uiActions } from '../../../../store/slices/ui-slice';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';
import Button from '../../../../shared/ui/Button/Button';
import classes from './Form.module.scss';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';

const Confirm = () => {
  const dispatch = useDispatch();
  const deletionType = useSelector(getModalFormContent);
  const selectedTask = useSelector(getSelectedTask);
  const selectedBoard = useSelector(getActiveBoard);

  let headerName = '';
  let description: React.ReactNode;

  const onCancel = () => dispatch(uiActions.hideModal());
  let onConfirm = () => {};

  switch (deletionType) {
    case ModalContent.confirmDeleteTask:
      headerName = 'task';
      description = (
        <p className={`form-description ${classes['form-description']}`}>
          Are you sure you want to delete the <span>'{selectedTask.title}'</span> task? This action will remove all
          subtasks and cannot be reversed.
        </p>
      );

      onConfirm = () => {
        dispatch(dataActions.removeTask(selectedTask.id));
        dispatch(dataActions.saveChanges('column'));
        dispatch(uiActions.hideModal());
      };
      break;
    case ModalContent.confirmDeleteBoard:
      headerName = 'board';
      description = (
        <p className={`form-description ${classes['form-description']}`}>
          Are you sure you want to delete the <span>'{selectedBoard.name}'</span> board? This action will remove all
          columns and tasks and cannot be reversed.
        </p>
      );

      onConfirm = () => {
        dispatch(dataActions.deleteActiveBoard());
        dispatch(dataActions.saveChanges('board'));
        dispatch(uiActions.hideModal());
      };
      break;
    default:
      break;
  }

  return (
    <div className={`form ${classes.form}`}>
      <h3 className={classes['form-warning-text']}>Delete this {headerName}?</h3>
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
