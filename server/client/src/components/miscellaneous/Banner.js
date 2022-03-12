/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from 'react';
import styles from './Banner.module.css';
import './Banner.module.css';

const Banner = () => {
  const firstDotClickHandler = () => {
    SetCurrentBanner(1);
  };
  const secondDotClickHandler = () => {
    SetCurrentBanner(2);
  };
  const thirdDotClickHandler = () => {
    SetCurrentBanner(3);
  };
  const [currentBanner, SetCurrentBanner] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      SetCurrentBanner((currentBanner) =>
        currentBanner >= 3 ? 1 : currentBanner + 1
      );
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <img
        src={`/img/banners/carousel-${currentBanner}.jpg`}
        alt="sale-poster"
        className={styles['banner']}
      />
      <div className={styles['dot-nav']}>
        <a
          onClick={firstDotClickHandler}
          className={currentBanner === 1 ? styles['dot-active'] : styles['dot']}
        ></a>
        <a
          onClick={secondDotClickHandler}
          className={currentBanner === 2 ? styles['dot-active'] : styles['dot']}
        ></a>
        <a
          onClick={thirdDotClickHandler}
          className={currentBanner === 3 ? styles['dot-active'] : styles['dot']}
        ></a>
      </div>
    </>
  );
};

export default Banner;
