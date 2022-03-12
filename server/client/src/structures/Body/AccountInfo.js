import React, { useRef } from 'react';
import styles from './AccountInfo.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

import { authActions } from '../../store/auth-slice';

import GenericButton from '../../components/Button/GenericButton';
import { useDispatch, useSelector } from 'react-redux';

const Account = () => {
  let retrievedToken = useSelector((state) => state.auth.token);
  let userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const renderedUserPhoto = `/img/users/${userData.profilePhoto}`;

  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const addressInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const profilePhotoInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredFullName = fullNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredProfilePhoto = profilePhotoInputRef.current.files[0];

    const sentForm = new FormData();
    sentForm.append('name', enteredFullName);
    sentForm.append('email', enteredEmail);
    sentForm.append('address', enteredAddress);
    sentForm.append('phoneNumber', enteredPhoneNumber);
    sentForm.append('profilePhoto', enteredProfilePhoto);

    try {
      const response = await axios({
        method: 'PATCH',
        url: '/api/v1/users/updateMe',
        // url: 'http://localhost:5000/api/v1/users/updateMe',
        data: sentForm,
        headers: {
          'Content-Type': 'multipart/form-data; boundary=' + sentForm._boundary,
          Authorization: `Bearer ${retrievedToken}`,
        },
      });
      userData = response.data.data;
      const token = response.data.token;
      Swal.fire({
        position: 'top',
        toast: true,
        icon: 'success',
        title: 'New account settings have been saved!',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        dispatch(authActions.login({ token, userData }));
      });
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
    <div className={styles['profile-box']}>
      <div className={styles['user-summary']}>
        <img
          src={renderedUserPhoto}
          alt="profile"
          className={styles['profile-picture']}
        />
        <div className={styles['user-info']}>
          <p className={styles['summary-name']}>{userData.name}</p>
          <p className={styles['user-role']}>{userData.role}</p>
          <input
            name="photo"
            type="file"
            className={styles['upload-button']}
            ref={profilePhotoInputRef}
          />
        </div>
      </div>
      <form className={styles['user-form']}>
        <div className={styles['input-field']}>
          <label htmlFor="fullName" className={styles['label']}>
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            className={styles.input}
            ref={fullNameInputRef}
            defaultValue={userData.name}
          />
        </div>
        <div className={styles['input-field']}>
          <label htmlFor="email" className={styles['label']}>
            Email
          </label>
          <input
            type="text"
            name="email"
            className={styles.input}
            ref={emailInputRef}
            defaultValue={userData.email}
          />
        </div>
        <div className={styles['input-field']}>
          <label htmlFor="address" className={styles['label']}>
            Your Address
          </label>
          <input
            type="text"
            name="address"
            className={styles.input}
            ref={addressInputRef}
            defaultValue={userData.address}
          />
        </div>
        <div className={styles['input-field']}>
          <label htmlFor="phoneNumber" className={styles['label']}>
            Phone Number
          </label>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="phoneNumber"
            className={styles.input}
            ref={phoneNumberInputRef}
            defaultValue={userData.phoneNumber}
          />
        </div>
      </form>
      <GenericButton onClick={submitHandler} text="SAVE CURRENT SETTINGS" />
    </div>
  );
};

export default Account;
