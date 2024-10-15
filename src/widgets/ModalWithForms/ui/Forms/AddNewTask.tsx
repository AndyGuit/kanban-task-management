import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputsList } from '../InputsLists/InputsList';
import { ButtonStyle, Button, Input, Select } from 'src/shared/ui';
import type { TOptionType } from 'src/shared/ui';
import { BoardsActions, BoardsSelectors } from 'src/pages/Kanban/Board';
import { ModalActions } from 'src/widgets/ModalWithForms';
import { generateRandomId, useInput, validate } from 'src/shared/lib';
import classes from './Form.module.scss';

const AddNewTask = () => {
  const dispatch = useDispatch();
  const columns = useSelector(BoardsSelectors.getColumnsStatus);

  const titleInput = useInput(validate.notEmpty);
  const descriptionInput = useInput(() => true);

  const [subtasks, setSubtasks] = useState<ISubtask[]>([
    { title: '', isCompleted: false },
  ]);

  const [subtasksHasNames, setSubtasksHasNames] = useState(true);

  const [selectedColumn, setSelectedColumn] = useState<{
    name: string;
    statusId: string;
  }>({ ...columns[0] });

  const subtaskChangeHandler = (value: string, index: number) => {
    subtasks[index].title = value;
    setSubtasksHasNames(true);
  };

  const addSubtaskHandler = () => {
    setSubtasks((state) => [...state, { title: '', isCompleted: false }]);
  };

  const removeSubtaskHandler = (index: number) => {
    setSubtasks((state) => state.filter((_, i) => i !== index));
  };

  const statusChangeHandler = (option: TOptionType) => {
    console.log(option);
    setSelectedColumn({ ...option, statusId: option.id });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubtasksHasNames(subtasks.every((subt) => subt.title !== ''));
    titleInput.inputBlurHandler();

    if (titleInput.isValid && subtasksHasNames) {
      const newTask: ITask = {
        id: generateRandomId(),
        title: titleInput.value,
        description: descriptionInput.value,
        status: selectedColumn.name,
        statusId: selectedColumn.statusId,
        subtasks: subtasks,
      };

      dispatch(BoardsActions.setSelectedColumn(selectedColumn.statusId));
      dispatch(BoardsActions.addTask(newTask));
      dispatch(BoardsActions.saveChanges('column'));
      dispatch(ModalActions.hideModal());
    }
  };

  return (
    <form onSubmit={submitHandler} className={`form ${classes.form}`}>
      <h3>Add New Task</h3>
      <div className={classes['form-input']}>
        <label htmlFor="new-title">Title</label>
        <Input
          type="text"
          id="new-title"
          invalid={titleInput.hasError}
          onChange={titleInput.valueChangeHandler}
          onBlur={titleInput.inputBlurHandler}
          value={titleInput.value}
          isRemovable={false}
        />
      </div>
      <div className={classes['form-input']}>
        <label htmlFor="new-description">Description</label>
        <Input
          type="textarea"
          id="new-description"
          invalid={descriptionInput.hasError}
          onChange={descriptionInput.valueChangeHandler}
          onBlur={descriptionInput.inputBlurHandler}
          value={descriptionInput.value}
          isRemovable={false}
        />
      </div>
      <div className={classes['form-input']}>
        <label>Subtasks</label>
        <InputsList
          listItems={subtasks.map((subt) => ({
            name: subt.title,
            isDisabled: false,
            isRemovable: subtasks.length > 1,
          }))}
          isScrollable={subtasks.length > 1}
          isInputsNotEmpty={subtasksHasNames}
          setIsInputsNotEmpty={setSubtasksHasNames}
          isValidFunc={validate.notEmpty}
          blurInputHandler={() => setSubtasks([...subtasks])}
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
        value={selectedColumn.name}
        onSelect={statusChangeHandler}
        label="Status"
        options={columns.map((col) => ({ ...col, id: col.statusId }))}
      />
      <Button styleClass={ButtonStyle.FORM_PRIMARY} type="submit">
        Create Task
      </Button>
    </form>
  );
};

export default AddNewTask;
