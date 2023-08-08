import classes from './SelectInput.module.scss';

type Props = {
  disabled: boolean;
  options: string[];
};

const SelectInput = (props: Props) => {
  const selectClasses = `select ${classes['select']}`;

  return (
    <select disabled={props.disabled} className={selectClasses}>
      {props.options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default SelectInput;
