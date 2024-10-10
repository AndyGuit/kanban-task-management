import { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from 'src/shared/lib/hooks/use-input';
import Button from 'src/shared/ui/Button/Button';
import Input from 'src/shared/ui/Input/Input';
import classes from './Form.module.scss';
import validate from 'src/shared/lib/functions/validate';
import { ISubtask, ITask } from 'src/shared/types/dataTypes';
import { InputsList } from 'src/entities/InputsList';
import Select, { TOptionType } from 'src/shared/ui/Select/Select';
import { ButtonStyle } from 'src/shared/ui/Button/buttonStyles';
import {
  DataActions,
  DataSelectors,
  UIActions,
} from 'src/app/providers/StoreProvider';

const EditTask = () => {
  const dispatch = useDispatch();
  const taskData = useSelector(DataSelectors.getSelectedTask);
  const selectedColumn = useSelector(DataSelectors.getSelectedColumn);
  const activeBoard = useSelector(DataSelectors.getActiveBoard);
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

  const [subtasksCopy, setSubtasksCopy] = useState<ISubtask[]>(
    taskData.subtasks.map((subt) => ({ ...subt })),
  );

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

    const subtasksHasValues = subtasksCopy.every(
      (subtask) => subtask.title !== '',
    );
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
        dispatch(DataActions.removeTask(taskData.id));
        dispatch(DataActions.saveChanges('column'));
        dispatch(DataActions.setSelectedColumn(newStatus.statusId));
        dispatch(DataActions.addTask(editedTask));
        dispatch(DataActions.setSelectedTask(editedTask.id));
        dispatch(DataActions.saveChanges('task'));
      } else {
        dispatch(DataActions.replaceTask(editedTask));
        dispatch(DataActions.saveChanges('column'));
      }
      dispatch(UIActions.hideModal());
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
          changeInputHandler={(value, index) =>
            subtaskChangeHandler(value, index)
          }
          removeInputHandler={(index) => removeSubtaskHandler(index)}
        />
      </div>
      <Button
        onClick={addSubtaskHandler}
        styleClass={ButtonStyle.FORM_SECONDARY}
      >
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
