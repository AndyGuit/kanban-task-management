import classes from './Popover.module.scss';
import { PopoverContentPosition } from '../constants/PopoverContentPosition';
import { useClickOutside } from 'src/shared/lib';

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  direction?: PopoverContentPosition;
}

export const Popover = (props: Props) => {
  const {
    children,
    trigger,
    direction = PopoverContentPosition.BOTTOM_LEFT,
  } = props;

  const contentClasses = `popover-content ${classes['popover-content']} ${classes[direction]}`;
  const { isContentVisible, toggleContent } = useClickOutside(
    classes.trigger,
    classes.content,
  );

  return (
    <div className={classes['popover-wrapper']}>
      <div onClick={toggleContent} className={classes.trigger}>
        {trigger}
      </div>
      {isContentVisible && <div className={contentClasses}>{children}</div>}
    </div>
  );
};
