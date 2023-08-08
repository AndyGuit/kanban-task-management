import classes from './SelectInput.module.scss';

type Props = {
  disabled: boolean;
  options: string[];
  label: string;
};

const SelectInput = (props: Props) => {
  const selectClasses = `select ${classes['select']}`;

  return (
    <div className={classes['select-wrapper']}>
      <label>{props.label}</label>
      <select disabled={props.disabled} className={selectClasses}>
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
