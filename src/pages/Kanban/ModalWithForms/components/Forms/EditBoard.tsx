import { FormEvent, useState } from 'react';
import {
  generateRandomId,
  useAppDispatch,
  useAppSelector,
  useInput,
  validate,
} from 'src/shared/lib';
import { InputsList } from '../InputsLists/InputsList';
import { ButtonStyle, Button, Input } from 'src/shared/ui';
import { BoardsActions, BoardsSelectors } from 'src/entities/BoardsSlice';
import { ModalActions } from 'src/entities/ModalSlice';
import classes from './Form.module.scss';

const EditBoard = () => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(BoardsSelectors.getActiveBoard);

  const boardNameInput = useInput(validate.notEmpty, activeBoard?.name);

  const [newColumns, setNewColumns] = useState<IColumn[]>(
    structuredClone(activeBoard?.columns || []),
  );

  const [columnsHasNames, setColumnsHasNames] = useState(true);

  const addColumnHandler = () => {
    setNewColumns((state) => [
      ...state,
      { id: generateRandomId(), name: '', tasks: [] },
    ]);
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

    if (boardNameInput.isValid && inputsNotEmpty) {
      const editedBoard: IBoard = {
        ...activeBoard!,
        name: boardNameInput.value,
        columns: newColumns,
      };

      dispatch(BoardsActions.replaceActiveBoard(editedBoard));
      dispatch(BoardsActions.saveChanges('board'));
      dispatch(ModalActions.hideModal());
    }
  };

  return (
    <form onSubmit={submitHandler} className={`form ${classes.form}`}>
      <h3>Edit Board</h3>
      <div className={classes['form-input']}>
        <label htmlFor="board-name">Board Name</label>
        <Input
          id="board-name"
          invalid={boardNameInput.hasError}
          onChange={boardNameInput.valueChangeHandler}
          onBlur={boardNameInput.inputBlurHandler}
          value={boardNameInput.value}
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
          blurInputHandler={() => setNewColumns([...newColumns])}
          changeInputHandler={(value, index) =>
            columnChangeHandler(value, index)
          }
          removeInputHandler={(index) => removeColumnHandler(index)}
        />
      </div>
      <Button
        onClick={addColumnHandler}
        styleClass={ButtonStyle.FORM_SECONDARY}
      >
        + Add New Column
      </Button>
      <Button styleClass={ButtonStyle.FORM_PRIMARY} type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default EditBoard;
