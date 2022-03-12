import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import { authActions } from '../store/auth-slice';
import GenericButton from '../components/Button/GenericButton';
import styles from './Register.module.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const fullNameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const createAccountHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredfullName = fullNameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/v1/users/signup',
        // url: 'http://localhost:5000/api/v1/users/signup',
        data: {
          name: enteredfullName,
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
        },
      });
      const userData = response.data.data;
      const { token } = response.data;
      dispatch(authActions.login({ token, userData }));
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
    <div className={styles['page-background']}>
      <div className={styles['register-box']}>
        <div className={styles['side-box']}>
          <Link to="/">
            <img className={styles.logo} src="/logo192.png" alt="web-logo" />
          </Link>
          <div>
            <header className={styles['join-text']}>Join ShopDi</header>
            <div className={styles['promo-text']}>
              <p>The more you purchase</p>
              <p>The more you save</p>
            </div>
          </div>
          <div className={styles['login-section']}>
            Already have an account?{' '}
            <Link className={styles['login-link']} to="/login">
              Log in now
            </Link>
          </div>
        </div>
        <div className={styles['main-box']}>
          <header className={styles['main-header']}>Create Account</header>
          <div className={styles['input-form']}>
            <input
              className={styles['input']}
              type="text"
              name="Email"
              placeholder="youremail@example.com"
              ref={emailInputRef}
            />
            <input
              className={styles['input']}
              type="text"
              name="Full name"
              placeholder="John Smith"
              ref={fullNameInputRef}
            />
            <input
              className={styles['input']}
              type="text"
              name="password"
              placeholder="Password"
              ref={passwordInputRef}
            />
            <input
              className={styles['input']}
              type="text"
              name="confirmPassword"
              placeholder="Confirm your password"
              ref={confirmPasswordInputRef}
            />
            <GenericButton
              onClick={createAccountHandler}
              text="create account"
            />
          </div>
          <p className={styles.tor}>
            By continuing, You agree to our Terms and Services that you have
            read thoroughly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
