import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './LogoutButton.module.css';
import { authActions } from '../../store/auth-slice';

const LogoutButton = (props) => {
  const dispatch = useDispatch();

  const LogoutHandler = async () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      <button onClick={LogoutHandler} className={styles['logout-button']}>
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
