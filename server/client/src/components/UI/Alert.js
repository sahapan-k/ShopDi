import React from 'react';

import { Modal } from './Modal';

const Alert = (props) => {
  return (
    <Modal>
      <div className={`alert alert--${props.type}`}>{props.message}</div>;
    </Modal>
  );
};

export default Alert;
