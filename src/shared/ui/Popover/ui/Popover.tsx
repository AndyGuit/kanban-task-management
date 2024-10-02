import { useEffect, useState } from 'react';
import classes from './Popover.module.scss';
import { PopoverContentPosition } from '../constants/PopoverContentPosition';

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  direction: PopoverContentPosition;
}

export const Popover = (props: Props) => {
  const { children, trigger, direction } = props;
  const [isContentVisible, setIsContentVisible] = useState(false);

  const contentClasses = `popover-content ${classes['popover-content']} ${classes[direction]}`;

  const toggleContent = () => {
    setIsContentVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isClickedOnButton = target.closest(`.${classes.trigger}`);
      const isClickedOutside = !target.classList.contains(classes.content);

      if (isClickedOutside && !isClickedOnButton) {
        setIsContentVisible(false);
      }
    };

    if (isContentVisible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isContentVisible]);

  return (
    <div className={classes['popover-wrapper']}>
      <div onClick={toggleContent} className={classes.trigger}>
        {trigger}
      </div>
      {isContentVisible && <div className={contentClasses}>{children}</div>}
    </div>
  );
};
