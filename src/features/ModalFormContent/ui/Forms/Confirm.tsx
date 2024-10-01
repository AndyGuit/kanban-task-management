import { useDispatch, useSelector } from 'react-redux';
import { ModalContent } from '../../../../shared/types/modalFormContentTypes';
import Button from '../../../../shared/ui/Button/Button';
import classes from './Form.module.scss';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';
import { DataActions, DataSelectors, UIActions, UISelectors } from '../../../../app/providers/StoreProvider';

const Confirm = () => {
  const dispatch = useDispatch();
  const deletionType = useSelector(UISelectors.getModalFormContent);
  const selectedTask = useSelector(DataSelectors.getSelectedTask);
  const selectedBoard = useSelector(DataSelectors.getActiveBoard);

  let headerName = '';
  let description: React.ReactNode;

  const onCancel = () => dispatch(UIActions.hideModal());
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
        dispatch(DataActions.removeTask(selectedTask.id));
        dispatch(DataActions.saveChanges('column'));
        dispatch(UIActions.hideModal());
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
        dispatch(DataActions.deleteActiveBoard());
        dispatch(DataActions.saveChanges('board'));
        dispatch(UIActions.hideModal());
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
