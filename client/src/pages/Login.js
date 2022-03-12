import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Login.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import GenericButton from '../components/Button/GenericButton';
import { authActions } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const response = await axios({
        method: 'POST',
        url: '/api/v1/users/login',
        // url: 'http://localhost:5000/api/v1/users/login',
        withCredentials: 'include',
        data: {
          email: enteredEmail,
          password: enteredPassword,
        },
      });
      const userData = response.data.data;
      const { token, cartData } = response.data;
      dispatch(authActions.login({ token, userData, cartData }));
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
      <div className={styles['login-box']}>
        <div className={styles['white-background']}>
          <div className={styles['main-header']}>Login</div>
          <form onSubmit={loginHandler} className={styles['input-form']}>
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
              name="password"
              placeholder="Password"
              ref={passwordInputRef}
            />
            <Link to="/forgotPassword" className={styles['link-to']}>
              Forgot your password?
            </Link>
            <GenericButton type="submit" text="Sign In" />
            <Link to="/register" className={styles['link-to']}>
              New to Shopdi? Sign up now
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
