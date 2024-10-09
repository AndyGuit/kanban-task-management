import { useEffect, useState } from 'react';
import { ChevronDown } from '../Icons/Icons';
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

function Select(props: Props) {
  const { options, onSelect, label = 'Select Value', disabled } = props;
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options[0] || 'select option',
  );

  const handleToggleOptions = () => {
    if (disabled) return;
    setIsOptionsVisible((prev) => !prev);
  };

  const handleSelectOption = (option: TOptionType) => {
    onSelect?.(option);
    setSelectedOption(option);
    setIsOptionsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isClickedOnSelect = target.closest(`.${classes['select-wrapper']}`);
      const isClickedOutside = !target.classList.contains(
        classes['select-wrapper'],
      );

      if (isClickedOutside && !isClickedOnSelect) {
        setIsOptionsVisible(false);
      }
    };

    if (isOptionsVisible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOptionsVisible]);

  return (
    <div className={classes['select-wrapper']}>
      <div className={classes['select-label']}>{label}</div>
      <div
        onClick={handleToggleOptions}
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

export default Select;
