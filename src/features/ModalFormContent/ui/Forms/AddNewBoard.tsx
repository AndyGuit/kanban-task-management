import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import generateRandomId from '../../../../shared/lib/functions/randomId';
import validate from '../../../../shared/lib/functions/validate';
import useInput from '../../../../shared/lib/hooks/use-input';
import { dataActions } from '../../../../store/slices/data-slice';
import { uiActions } from '../../../../store/slices/ui-slice';
import { IBoard, IColumn } from '../../../../shared/types/dataTypes';
import InputsList from '../../../../components/InputsList/InputsList';
import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import classes from './Form.module.scss';
import { ButtonStyle } from '../../../../shared/ui/Button/buttonStyles';

const AddNewBoard = () => {
  const dispatch = useDispatch();

  const titleInput = useInput(validate.notEmpty);

  const [newColumns, setNewColumns] = useState<IColumn[]>([{ name: '', id: generateRandomId(), tasks: [] }]);

  const [columnsHasNames, setColumnsHasNames] = useState(true);

  const addColumnHandler = () => {
    setNewColumns((state) => [...state, { id: generateRandomId(), name: '', tasks: [] }]);
  };

  const columnChangeHandler = (value: string, index: number) => {
    newColumns[index].name = value;
  };

  const removeColumnHandler = (index: number) => {
    setNewColumns((state) => state.filter((_, i) => i !== index));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputsNotEmpty = newColumns.every((col) => col.name !== '');
    setColumnsHasNames(inputsNotEmpty);
    titleInput.inputBlurHandler();

    if (titleInput.isValid && inputsNotEmpty) {
      const newBoard: IBoard = {
        id: generateRandomId(),
        isActive: true,
        columns: newColumns,
        name: titleInput.value,
      };

      dispatch(dataActions.addBoard(newBoard));
      dispatch(dataActions.setActiveBoard(newBoard.id));
      dispatch(uiActions.hideModal());
    }
  };

  return (
    <form onSubmit={submitHandler} className={`form ${classes.form}`}>
      <h3>Add New Board</h3>
      <div className={classes['form-input']}>
        <label htmlFor="board-name">Board Name</label>
        <Input
          id="board-name"
          invalid={titleInput.hasError}
          onChange={titleInput.valueChangeHandler}
          onBlur={titleInput.inputBlurHandler}
          value={titleInput.value}
          isRemovable={false}
          type="text"
        />
      </div>
      <div className={classes['form-input']}>
        <label>Columns</label>
        <InputsList
          listItems={newColumns.map((col) => ({
            name: col.name,
            isDisabled: col.tasks.length !== 0,
            isRemovable: col.tasks.length === 0,
          }))}
          isScrollable={newColumns.length > 1}
          isInputsNotEmpty={columnsHasNames}
          setIsInputsNotEmpty={setColumnsHasNames}
          isValidFunc={validate.notEmpty}
          blurInputHandler={() => {
            setNewColumns([...newColumns]);
          }}
          changeInputHandler={(value, index) => columnChangeHandler(value, index)}
          removeInputHandler={(index) => removeColumnHandler(index)}
        />
      </div>
      <Button onClick={addColumnHandler} styleClass={ButtonStyle.FORM_SECONDARY}>
        + Add New Column
      </Button>
      <Button styleClass={ButtonStyle.FORM_PRIMARY} type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default AddNewBoard;
