import classes from './SelectInput.module.scss';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { name: string; statusId: string }[];
  label: string;
}

/**
 * @deprecated
 * Use "Select" component instead
 */
const SelectInput = (props: Props) => {
  const { onChange, disabled, value, label, options } = props;
  const selectClasses = `select ${classes['select']}`;

  return (
    <div className={classes['select-wrapper']}>
      <label>{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={selectClasses}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.statusId}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
