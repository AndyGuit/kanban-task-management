import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import generateRandomId from '../../shared/functions/randomId';
import validate from '../../shared/functions/validate';
import useInput from '../../shared/hooks/use-input';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { IBoard, IColumn } from '../../shared/types/dataTypes';
import Button from '../../shared/ui/Button/Button';
import Input from '../../shared/ui/Input/Input';
import classes from './Form.module.scss';
import cloneDeep from 'lodash.clonedeep';
import { getActiveBoard } from '../../store/selectors/data-selectors';
import InputsList from '../InputsList/InputsList';
import { ButtonStyle } from '../../shared/ui/Button/buttonStyles';

const EditBoard = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(getActiveBoard);

  const boardNameInput = useInput(validate.notEmpty, activeBoard.name);

  const [newColumns, setNewColumns] = useState<IColumn[]>(cloneDeep(activeBoard.columns));

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

    if (boardNameInput.isValid && inputsNotEmpty) {
      const editedBoard: IBoard = {
        ...activeBoard,
        name: boardNameInput.value,
        columns: newColumns,
      };

      dispatch(dataActions.replaceActiveBoard(editedBoard));
      dispatch(dataActions.saveChanges('board'));
      dispatch(uiActions.hideModal());
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

export default EditBoard;
