import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import validate from '../../functions/validate';
import { RootState } from '../../store';
import Button from '../UI/Button';
import Input from '../UI/Input';
import InputWithValidation from '../UI/InputWithValidation';
import classes from './Form.module.scss';

const AddNewColumn = () => {
  const boardName = useSelector(
    (state: RootState) => state.data.activeBoard.name
  );

  const columns = useSelector(
    (state: RootState) => state.data.activeBoard.columns
  );
  console.log(columns);

  const addColumnHandler = () => {};

  const columnsList = (
    <Fragment>
      <ul className={`form-columns-list ${classes['form-columns-list']}`}>
        {columns.map((column, index) => (
          // TODO: generate random id for key
          <li key={`${column.name}${index}`}>
            <InputWithValidation
              // onBlur={() => setcolumns([...columns])}
              // onChange={(value: string) => columnChangeHandler(value, index)}
              disabled={column.tasks.length !== 0}
              validateFn={validate.notEmpty}
              value={column.name}
              isRemovable={column.tasks.length === 0}
              // onRemove={removeSubtaskHandler.bind(null, index)}
              type="text"
            />
          </li>
        ))}
      </ul>
      {/* {!columnsHasNames && (
        <p className="error-text">All columns should have title</p>
      )} */}
    </Fragment>
  );

  return (
    <form className={`form ${classes.form}`}>
      <h3>Add New Column</h3>
      <div className={classes['form-input']}>
        <label htmlFor="board-name">Board Name</label>
        <Input
          disabled={true}
          value={boardName}
          type="text"
          id="board-name"
          isRemovable={false}
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

export default AddNewColumn;
