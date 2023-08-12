import { ChangeEvent } from 'react';
import classes from './SelectInput.module.scss';

type Props = {
  disabled: boolean;
  options: { name: string; statusId: string }[];
  label: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput = (props: Props) => {
  const selectClasses = `select ${classes['select']}`;

  return (
    <div className={classes['select-wrapper']}>
      <label>{props.label}</label>
      <select
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        className={selectClasses}>
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
