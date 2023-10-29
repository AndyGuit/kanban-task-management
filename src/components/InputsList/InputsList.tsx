import { Fragment } from 'react';
import classes from './InputsList.module.scss';
import InputWithValidation from '../UI/InputWithValidation';
import { IColumn } from '../../types/dataTypes';

type Props = {
  listItems: IColumn[];
  isScrollable: boolean;
  isInputsNotEmpty: boolean;
  setIsInputsNotEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  isValidFunc: (val: string) => boolean;
  blurInputHandler: () => void;
  changeInputHandler: (value: string, index: number) => void;
  removeInputHandler: (index: number) => void;
};

export default function InputsList(props: Props) {
  const {
    listItems,
    isValidFunc,
    isScrollable,
    isInputsNotEmpty,
    setIsInputsNotEmpty,
    blurInputHandler,
    changeInputHandler,
    removeInputHandler,
  } = props;

  return (
    <Fragment>
      <ul
        className={`inputs-list ${classes['inputs-list']} ${
          isScrollable && classes['scrollable']
        }`}>
        {listItems.map((column, index) => (
          <li key={`${column.name}${index}`}>
            <InputWithValidation
              onBlur={() => {
                setIsInputsNotEmpty(true);
                blurInputHandler();
              }}
              onChange={(value: string) => changeInputHandler(value, index)}
              disabled={column.tasks.length !== 0}
              validateFn={isValidFunc}
              value={column.name}
              isRemovable={column.tasks.length === 0}
              onRemove={removeInputHandler.bind(null, index)}
              type="text"
            />
          </li>
        ))}
      </ul>
      {!isInputsNotEmpty && (
        <p className="error-text">All columns should have title</p>
      )}
    </Fragment>
  );
}
