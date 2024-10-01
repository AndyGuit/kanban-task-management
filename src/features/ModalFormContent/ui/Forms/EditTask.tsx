import { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import useInput from '../../../../shared/lib/hooks/use-input';
import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import classes from './Form.module.scss';
import validate from '../../../../shared/lib/functions/validate';
import { dataActions } from '../../../../store/slices/data-slice';
import { ISubtask, ITask } from '../../../../shared/types/dataTypes';
import { uiActions } from '../../../../store/slices/ui-slice';
import { getSelectedTask } from '../../../../store/selectors/data-selectors';
import InputsList from '../../../../components/InputsList/InputsList';
import Select, { TOptionType } from '../../../../shared/ui/Select/Select';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';

const EditTask = () => {
  const dispatch = useDispatch();
  const taskData = useSelector(getSelectedTask);
  const selectedColumn = useSelector((state: RootState) => state.data.selectedColumn);
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);
  const columns = activeBoard.columns.map((col) => {
    return { name: col.name, statusId: col.id };
  });

  const [newStatus, setNewStatus] = useState<{
    name: string;
    statusId: string;
  }>({ name: selectedColumn.name, statusId: selectedColumn.id });
  const [subtasksHasNames, setSubtasksHasNames] = useState(true);

  const titleInput = useInput(validate.notEmpty, taskData.title);
  const descriptionInput = useInput(() => true, taskData.description);
  const statusInput = useInput(validate.notEmpty, selectedColumn.id);

  const removeSubtaskHandler = (index: number) => {
    const left = subtasksCopy.slice(0, index);
    const right = subtasksCopy.slice(index + 1);

    setSubtasksCopy(left.concat(right));
  };

  const [subtasksCopy, setSubtasksCopy] = useState<ISubtask[]>(taskData.subtasks.map((subt) => ({ ...subt })));

  const subtaskChangeHandler = (value: string, index: number) => {
    subtasksCopy[index].title = value;
    setSubtasksHasNames(true);
  };

  const addSubtaskHandler = () => {
    setSubtasksCopy((state) => [...state, { isCompleted: false, title: '' }]);
  };

  const statusHandler = (option: TOptionType) => {
    setNewStatus({ statusId: option.id, name: option.name });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subtasksHasValues = subtasksCopy.every((subt) => subt.title !== '');
    setSubtasksHasNames(subtasksHasValues);

    if (titleInput.isValid && subtasksHasValues) {
      const editedTask: ITask = {
        title: titleInput.value,
        description: descriptionInput.value,
        id: taskData.id,
        status: newStatus.name,
        statusId: newStatus.statusId,
        subtasks: subtasksCopy,
      };

      if (taskData.statusId !== newStatus.statusId) {
        dispatch(dataActions.removeTask(taskData.id));
        dispatch(dataActions.saveChanges('column'));
        dispatch(dataActions.setSelectedColumn(newStatus.statusId));
        dispatch(dataActions.addTask(editedTask));
        dispatch(dataActions.setSelectedTask(editedTask.id));
        dispatch(dataActions.saveChanges('task'));
      } else {
        dispatch(dataActions.replaceTask(editedTask));
        dispatch(dataActions.saveChanges('column'));
      }
      dispatch(uiActions.hideModal());
    }
  };

  return (
    <form onSubmit={submitHandler} className={`form ${classes.form}`}>
      <h3>Edit Task</h3>
      <div className={classes['form-input']}>
        <label htmlFor="edit-title">Title</label>
        <Input
          id="edit-title"
          invalid={!titleInput.isValid}
          value={titleInput.value}
          onChange={titleInput.valueChangeHandler}
          onBlur={titleInput.inputBlurHandler}
          isRemovable={false}
          type="text"
        />
      </div>
      <div className={classes['form-input']}>
        <label htmlFor="edit-description">Description</label>
        <Input
          id="edit-description"
          value={descriptionInput.value}
          onChange={descriptionInput.valueChangeHandler}
          onBlur={descriptionInput.inputBlurHandler}
          isRemovable={false}
          type="textarea"
        />
      </div>
      <div className={classes['form-input']}>
        <label>Subtasks</label>
        <InputsList
          listItems={subtasksCopy.map((subt) => ({
            name: subt.title,
            isDisabled: false,
            isRemovable: subtasksCopy.length > 1,
          }))}
          isScrollable={subtasksCopy.length > 1}
          isInputsNotEmpty={subtasksHasNames}
          setIsInputsNotEmpty={setSubtasksHasNames}
          isValidFunc={validate.notEmpty}
          blurInputHandler={() => setSubtasksCopy([...subtasksCopy])}
          changeInputHandler={(value, index) => subtaskChangeHandler(value, index)}
          removeInputHandler={(index) => removeSubtaskHandler(index)}
        />
      </div>
      <Button onClick={addSubtaskHandler} styleClass={ButtonStyle.FORM_SECONDARY}>
        + Add New Subtask
      </Button>
      <Select
        value={statusInput.value}
        onSelect={statusHandler}
        label="Status"
        options={columns.map((col) => ({ id: col.statusId, name: col.name }))}
      />
      <Button styleClass={ButtonStyle.FORM_PRIMARY} type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default EditTask;