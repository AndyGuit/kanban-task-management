import { InputWithValidation } from 'src/shared/ui';
import classes from './InputsList.module.scss';

type Props = {
  listItems: { name: string; isDisabled: boolean; isRemovable: boolean }[];
  isScrollable: boolean;
  isInputsNotEmpty: boolean;
  setIsInputsNotEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  isValidFunc: (val: string) => boolean;
  blurInputHandler: () => void;
  changeInputHandler: (value: string, index: number) => void;
  removeInputHandler: (index: number) => void;
};

export function InputsList(props: Props) {
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
    <>
      <ul
        className={`inputs-list ${classes['inputs-list']} ${isScrollable && classes['scrollable']}`}
      >
        {listItems.map((item, index) => (
          <li key={`${item.name}${index}`}>
            <InputWithValidation
              onBlurHandler={() => {
                setIsInputsNotEmpty(true);
                blurInputHandler();
              }}
              onChangeHandler={(value: string) =>
                changeInputHandler(value, index)
              }
              disabled={item.isDisabled}
              validateFn={isValidFunc}
              value={item.name}
              isRemovable={item.isRemovable}
              onRemove={removeInputHandler.bind(null, index)}
              type="text"
            />
          </li>
        ))}
      </ul>
      {!isInputsNotEmpty && (
        <p className="error-text">All columns should have title</p>
      )}
    </>
  );
}
