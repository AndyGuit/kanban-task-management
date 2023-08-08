import { useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import { IconPopupDots } from '../../Icons/Icons';
import SelectInput from '../../SelectInput/SelectInput';
import Button from '../../UI/Button';
import classes from './ViewCard.module.scss';

const ViewCard = () => {
  const [isPopupShown, setIsPopupShown] = useState(false);

  const togglePopup = () => {
    setIsPopupShown(prevState => !prevState);
  };
  const formClasses = `form ${classes.form}`;

  return (
    <form className={formClasses}>
      <div className={classes['form-header']}>
        <h4>Task name</h4>
        <Button onClick={togglePopup} btnStyle="popup">
          <IconPopupDots />
        </Button>
      </div>
      <p className={`form-description ${classes['form-description']}`}>
        Description
      </p>
      <div className={classes['form-subtasks']}>
        <h5>Subtasks (1 of 3)</h5>
        <ul className={classes['subtasks-list']}>
          <li>
            <Checkbox name="subtask 1" isCompleted={false} />
          </li>
          <li>
            <Checkbox name="subtask 2" isCompleted={true} />
          </li>
        </ul>
      </div>
      <SelectInput disabled={true} options={['opt 1', 'opt 2']} />
    </form>
  );
};

export default ViewCard;
