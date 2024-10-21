import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputsList } from '../InputsLists/InputsList';
import { ButtonStyle, Button, Input } from 'src/shared/ui';
import { BoardsActions, BoardsSelectors } from 'src/entities/BoardsSlice';
import { ModalActions } from 'src/entities/ModalSlice';
import { generateRandomId, validate } from 'src/shared/lib';
import classes from './Form.module.scss';

const AddNewColumn = () => {
  const dispatch = useDispatch();
  const boardName = useSelector(BoardsSelectors.getActiveBoardName);

  const columns = useSelector(BoardsSelectors.getColumns);

  const [newColumns, setNewColumns] = useState(structuredClone(columns));
  const [columnsHasNames, setColumnsHasNames] = useState(true);

  const addColumnHandler = () => {
    setNewColumns((state) => [
      ...state!,
      { id: generateRandomId(), name: '', tasks: [] },
    ]);
  };

  const columnChangeHandler = (value: string, index: number) => {
    newColumns![index].name = value;
  };

  const removeColumnHandler = (index: number) => {
    setNewColumns((state) => state!.filter((_, i) => i !== index));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputsNotEmpty = newColumns!.every((col) => col.name !== '');
    setColumnsHasNames(inputsNotEmpty);

    if (inputsNotEmpty) {
      dispatch(BoardsActions.setColumns(newColumns!));
      dispatch(BoardsActions.saveChanges('board'));
      dispatch(ModalActions.hideModal());
    }
  };

  return (
    <form onSubmit={submitHandler} className={`form ${classes.form}`}>
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
        <InputsList
          listItems={newColumns!.map((col) => ({
            name: col.name,
            isDisabled: col.tasks.length !== 0,
            isRemovable: col.tasks.length === 0,
          }))}
          isScrollable={newColumns!.length > 1}
          isValidFunc={validate.notEmpty}
          isInputsNotEmpty={columnsHasNames}
          setIsInputsNotEmpty={setColumnsHasNames}
          blurInputHandler={() => setNewColumns([...newColumns!])}
          changeInputHandler={(value, index) =>
            columnChangeHandler(value, index)
          }
          removeInputHandler={removeColumnHandler}
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

export default AddNewColumn;
