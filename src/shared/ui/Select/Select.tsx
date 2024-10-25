import { useEffect, useState } from 'react';
import { ChevronDown } from '../Icons/Icons';
import { useClickOutside } from 'src/shared/lib';
import classes from './Select.module.scss';

export type TOptionType = {
  name: string;
  id: string;
};

interface Props {
  value: string;
  options: TOptionType[];
  label?: string;
  onSelect?: (option: TOptionType) => void;
  disabled?: boolean;
}

export function Select(props: Props) {
  const { options, value, onSelect, label = 'Select Value', disabled } = props;
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.name === value) || {
      name: 'Select Value',
      id: '1',
    },
  );

  useEffect(() => {
    setSelectedOption(
      options.find((option) => option.name === value) || {
        name: 'Select Value',
        id: '1',
      },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const {
    isContentVisible: isOptionsVisible,
    toggleContent: toggleOptions,
    hideContent: hideOptions,
  } = useClickOutside(classes['select-wrapper'], classes['select-wrapper']);

  const handleSelectOption = (option: TOptionType) => {
    onSelect?.(option);
    setSelectedOption(option);
    hideOptions();
  };

  return (
    <div className={classes['select-wrapper']}>
      <div className={classes['select-label']}>{label}</div>
      <div
        onClick={!disabled ? toggleOptions : undefined}
        className={
          'select-selected ' +
          classes['select-selected'] +
          ` ${disabled ? classes.disabled : ''}`
        }
      >
        <span>{selectedOption.name}</span>
        {!disabled && (
          <ChevronDown
            className={`${classes.chevron} ${isOptionsVisible ? classes.rotate : ''}`}
            stroke="#828FA3"
          />
        )}
      </div>
      <div
        className={
          'select-options ' +
          classes['select-options'] +
          ` ${isOptionsVisible ? classes.visible : ''}`
        }
      >
        {options.map((option) => (
          <div
            onClick={() => handleSelectOption(option)}
            key={option.id}
            className={'select-option ' + classes['select-option']}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}
