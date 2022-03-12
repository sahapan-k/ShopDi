import React, { useRef } from 'react';
import styles from './Settings.module.css';
import GenericButton from '../../components/Button/GenericButton';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

import { authActions } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  let retrievedToken = useSelector((state) => state.auth.token);
  let userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const deactivatePasswordInputRef = useRef();

  const clearInput = () => {
    currentPasswordInputRef.current.value = '';
    newPasswordInputRef.current.value = '';
    confirmPasswordInputRef.current.value = '';
  };

  const changePasswordSubmitHandler = async () => {
    const enteredCurrentPassword = currentPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    try {
      const response = await axios({
        method: 'PATCH',
        url: '/api/v1/users/changeMyPassword',
        // url: 'http://localhost:5000/api/v1/users/changeMyPassword',
        data: {
          passwordCurrent: enteredCurrentPassword,
          password: enteredNewPassword,
          confirmPassword: enteredConfirmPassword,
        },
        headers: {
          Authorization: `Bearer ${retrievedToken}`,
        },
      });
      userData = response.data.data;
      const token = response.data.token;
      dispatch(authActions.login({ token, userData }));
      Swal.fire({
        position: 'top',
        toast: true,
        icon: 'success',
        title: 'New password have been saved!',
        showConfirmButton: false,
        timer: 3000,
      });
      clearInput();
    } catch (error) {
      let errorMessage =
        error.response.data.message ||
        'Something went wrong! Please try again.';
      Swal.fire({
        position: 'top',
        icon: 'error',
        toast: true,
        title: errorMessage,
        showConfirmButton: false,
        timer: 4000,
        color: '#ff3333',
      });
    }
  };

  const deactivateAccountHandler = async () => {
    const authenticatePassword = deactivatePasswordInputRef.current.value;

    try {
      await axios({
        method: 'PATCH',
        url: '/api/v1/users/deleteMe',
        // url: 'http://localhost:5000/api/v1/users/deleteMe',
        data: {
          passwordCurrent: authenticatePassword,
        },
        headers: {
          Authorization: `Bearer ${retrievedToken}`,
        },
      });

      dispatch(authActions.logout());
      navigate('/', { replace: true });
    } catch (error) {
      let errorMessage =
        error.response.data.message ||
        'Something went wrong! Please try again.';
      Swal.fire({
        position: 'top',
        icon: 'error',
        toast: true,
        title: errorMessage,
        showConfirmButton: false,
        timer: 4000,
        color: '#ff3333',
      });
    }
  };

  return (
    <div className={styles['main-box']}>
      <div className={styles['change-password-box']}>
        <header className={styles['settings-header']}>Change password</header>
        <form className={styles['change-password-form']}>
          <input
            className={styles.input}
            placeholder="current password"
            ref={currentPasswordInputRef}
          />
          <input
            className={styles.input}
            placeholder="new password"
            ref={newPasswordInputRef}
          />
          <input
            className={styles.input}
            placeholder="confirm new password"
            ref={confirmPasswordInputRef}
          />
          <GenericButton
            onClick={changePasswordSubmitHandler}
            text="CHANGE PASSWORD"
          />
        </form>
      </div>
      <div>
        <div className={styles['deactive-box']}>
          <header className={styles['settings-header']}>
            Deactive account
          </header>
          <p className={styles['warning-text']}>
            Deleting your account is permanent. When you deleted your account,
            you won't be able to retrieve or recover any
            information/data/content concerning your account anymore.
          </p>
          <form className={styles['deactivate-account-form']}>
            <input
              className={styles.input}
              placeholder="current password"
              ref={deactivatePasswordInputRef}
            />
            <button
              className={styles['delete-account-button']}
              onClick={deactivateAccountHandler}
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
