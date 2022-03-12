import React from 'react';
import styles from './UserButton.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserButton = () => {
  const userData = useSelector((state) => state.auth.userData);
  const fullName = userData.name.split(' ');
  const firstName = fullName[0];

  return (
    <Link to="/user/account" className={styles['user-button-link']}>
      <button className={styles['user-card']}>
        <img
          src={`/img/users/${userData.profilePhoto}`}
          alt="user-profile"
          className={styles['profile-photo']}
        />
        <p className={styles['user-name']}>{firstName}</p>
      </button>
    </Link>
  );
};

export default UserButton;
