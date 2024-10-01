import { useEffect, useState } from 'react';
import { IconPopupDots } from '../../shared/ui/Icons/Icons';
import Button from '../../shared/ui/Button/Button';
import classes from './PopupWindow.module.scss';
import { ButtonStyle } from '../../shared/ui/Button/buttonStyles';

type Props = {
  btnText: 'Board' | 'Task';
  onClickDelete?: () => void;
  onClickEdit?: () => void;
};

const PopupWindow: React.FC<Props> = (props) => {
  const [isPopupShown, setIsPopupShown] = useState(false);

  const togglePopup = () => {
    setIsPopupShown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isClickedOnButton = target.closest('.button-popup');
      const isClickedOutside = !target.classList.contains('popup-window');

      if (isClickedOutside && !isClickedOnButton) {
        setIsPopupShown(false);
      }
    };

    if (isPopupShown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isPopupShown]);

  return (
    <div className={classes['popup-wrapper']}>
      <Button onClick={togglePopup} styleClass={ButtonStyle.POPUP}>
        <IconPopupDots />
      </Button>
      {isPopupShown && (
        <div className={`popup-window ${classes['popup-window']}`}>
          <Button onClick={props.onClickEdit} styleClass={ButtonStyle.TEXT_PRIMARY}>
            Edit {props.btnText}
          </Button>
          <Button onClick={props.onClickDelete} styleClass={ButtonStyle.TEXT_WARNING}>
            Delete {props.btnText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PopupWindow;
