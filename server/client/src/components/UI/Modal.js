import styles from './Modal.module.css';

import ReactDOM from 'react-dom';

const Modal = (props) => {
  const Backdrop = (props) => {
    return <div className={styles.backdrop} />;
  };

  const ModalOverlay = (props) => {
    return (
      <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
      </div>
    );
  };

  const portal = document.getElementById('overlays');

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portal)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal
      )}
    </>
  );
};

export default Modal;
