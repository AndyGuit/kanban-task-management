import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import generateRandomId from 'src/shared/lib/functions/randomId';
import validate from 'src/shared/lib/functions/validate';
import useInput from 'src/shared/lib/hooks/use-input';
import { ISubtask, ITask } from 'src/shared/types/dataTypes';
import { InputsList } from 'src/entities/InputsList';
import Button from 'src/shared/ui/Button/Button';
import Input from 'src/shared/ui/Input/Input';
import classes from './Form.module.scss';
import Select, { TOptionType } from 'src/shared/ui/Select/Select';
import { ButtonStyle } from 'src/shared/ui/Button/buttonStyles';
import {
  DataActions,
  DataSelectors,
  UIActions,
} from 'src/app/providers/StoreProvider';

const AddNewTask = () => {
  const dispatch = useDispatch();
  const columns = useSelector(DataSelectors.getColumnsStatus);

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

      dispatch(DataActions.setSelectedColumn(selectedColumn.statusId));
      dispatch(DataActions.addTask(newTask));
      dispatch(DataActions.saveChanges('column'));
      dispatch(UIActions.hideModal());
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
