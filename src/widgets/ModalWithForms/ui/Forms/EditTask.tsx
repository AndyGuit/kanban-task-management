import { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputsList } from '../InputsLists/InputsList';
import type { TOptionType } from 'src/shared/ui';
import { ButtonStyle, Select, Button, Input } from 'src/shared/ui';
import { BoardsActions, BoardsSelectors } from 'src/pages/Kanban/Board';
import { ModalActions } from 'src/widgets/ModalWithForms';
import { useInput, validate } from 'src/shared/lib';
import classes from './Form.module.scss';

const EditTask = () => {
  const dispatch = useDispatch();
  const taskData = useSelector(BoardsSelectors.getSelectedTask);
  const selectedColumn = useSelector(BoardsSelectors.getSelectedColumn);
  const activeBoard = useSelector(BoardsSelectors.getActiveBoard);
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
        dispatch(BoardsActions.removeTask(taskData.id));
        dispatch(BoardsActions.saveChanges('column'));
        dispatch(BoardsActions.setSelectedColumn(newStatus.statusId));
        dispatch(BoardsActions.addTask(editedTask));
        dispatch(BoardsActions.setSelectedTask(editedTask.id));
        dispatch(BoardsActions.saveChanges('task'));
      } else {
        dispatch(BoardsActions.replaceTask(editedTask));
        dispatch(BoardsActions.saveChanges('column'));
      }
      dispatch(ModalActions.hideModal());
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
