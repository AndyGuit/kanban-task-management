import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

type ModalProps = {
  children?: React.ReactNode;
  onClose?: () => void;
};

const Backdrop = (props: ModalProps) => {
  return <div onClick={props.onClose} className={classes['backdrop']}></div>;
};

const ModalOverlay = (props: ModalProps) => {
  return (
    <div className={`modal ${classes['modal']}`}>
      <div className={classes['content']}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays')!;

const Modal = (props: ModalProps) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
