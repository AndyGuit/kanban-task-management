import { FormEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import generateRandomId from '../../functions/randomId';
import validate from '../../functions/validate';
import useInput from '../../hooks/use-input';
import { RootState } from '../../store';
import { dataActions } from '../../store/slices/data-slice';
import { uiActions } from '../../store/slices/ui-slice';
import { IBoard, IColumn } from '../../types/dataTypes';
import Button from '../UI/Button';
import Input from '../UI/Input';
import InputWithValidation from '../UI/InputWithValidation';
import classes from './Form.module.scss';
import cloneDeep from 'lodash.clonedeep';

const EditBoard = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector((state: RootState) => state.data.activeBoard);

  const nameInput = useInput(validate.notEmpty, activeBoard.name);

  const [newColumns, setNewColumns] = useState<IColumn[]>(
    cloneDeep(activeBoard.columns)
  );

  const [columnsHasNames, setColumnsHasNames] = useState(true);

  const addColumnHandler = () => {
    setNewColumns(state => [
      ...state,
      { id: generateRandomId(), name: '', tasks: [] },
    ]);
  };

  const columnChangeHandler = (value: string, index: number) => {
    newColumns[index].name = value;
  };

  const removeColumnHandler = (index: number) => {
    setNewColumns(state => state.filter((_, i) => i !== index));
  };

  const columnsList = (
    <Fragment>
      <ul className={`form-columns-list ${classes['form-columns-list']}`}>
        {newColumns.map((column, index) => (
          <li key={`${column.name}${index}`}>
            <InputWithValidation
              onBlur={() => {
                setNewColumns([...newColumns]);
                setColumnsHasNames(true);
              }}
              onChange={(value: string) => columnChangeHandler(value, index)}
              validateFn={validate.notEmpty}
              value={column.name}
              isRemovable={newColumns.length > 1}
              onRemove={removeColumnHandler.bind(null, index)}
              type="text"
            />
          </li>
        ))}
      </ul>
      {!columnsHasNames && (
        <p className="error-text">All columns should have title</p>
      )}
    </Fragment>
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputsNotEmpty = newColumns.every(col => col.name !== '');
    setColumnsHasNames(inputsNotEmpty);

    if (nameInput.isValid && inputsNotEmpty) {
      const editedBoard: IBoard = {
        ...activeBoard,
        name: nameInput.value,
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
          invalid={nameInput.hasError}
          onChange={nameInput.valueChangeHandler}
          onBlur={nameInput.inputBlurHandler}
          value={nameInput.value}
          isRemovable={false}
          type="text"
        />
      </div>
      <div className={classes['form-input']}>
        <label>Columns</label>
        {columnsList}
      </div>
      <Button onClick={addColumnHandler} btnStyle="form-secondary">
        + Add New Column
      </Button>
      <Button btnStyle="form-primary" type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default EditBoard;
