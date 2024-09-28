import { useEffect, useState } from 'react';
import { ChevronDown } from '../Icons/Icons';
import { IColumn } from '../../types/dataTypes';
import classes from './Select.module.scss';

type Props = {
  options: Omit<IColumn, 'tasks'>[];
  onSelect?: () => void;
};

const Select: React.FC<Props> = (props) => {
  const { options, onSelect } = props;
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0] || 'select option');

  const handleToggleOptions = () => {
    setIsOptionsVisible((prev) => !prev);
  };

  const handleSelectOption = (option: Omit<IColumn, 'tasks'>) => {
    onSelect?.();
    setSelectedOption(option);
    setIsOptionsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isClickedOnSelect = target.closest(`.${classes['select-wrapper']}`);
      const isClickedOutside = !target.classList.contains(classes['select-wrapper']);

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
      <div className={classes['select-label']}>label</div>
      <div onClick={handleToggleOptions} className={classes['select-selected']}>
        <span>{selectedOption.name}</span> <ChevronDown />
      </div>
      <div className={classes['select-options'] + ` ${isOptionsVisible ? classes.visible : ''}`}>
        {options.map((option) => (
          <div onClick={() => handleSelectOption(option)} key={option.id} className={classes['select-option']}>
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
