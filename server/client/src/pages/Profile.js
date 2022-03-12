import React, { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  UserIcon,
  ShoppingCartIcon,
  CogIcon,
  PlusCircleIcon,
  ClipboardListIcon,
  ArchiveIcon,
} from '@heroicons/react/outline';

import Header from '../structures/Header/Nav';
import Footer from '../structures/Footer/Footer';
import Cart from '../components/Cart/Cart';

import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const cartIsVisible = useSelector((state) => state.ui.showCart);

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  return (
    <>
      {cartIsVisible ? <Cart /> : ''}
      <Header />
      <div className={styles['profile-page']}>
        <div className={styles['side-bar']}>
          <div className={styles['side-header']}>User Profile</div>
          <div className={styles['side-nav']}>
            <ul className={styles['side-nav-list']}>
              <li>
                <div className={styles['nav-items']}>
                  <div className={styles.icon}>
                    <UserIcon />
                  </div>
                  <NavLink
                    to="account"
                    className={(navData) =>
                      navData.isActive
                        ? styles.active
                        : styles['nav-items-text']
                    }
                  >
                    {' '}
                    User Info
                  </NavLink>
                </div>
              </li>
              <li>
                <div className={styles['nav-items']}>
                  <div className={styles.icon}>
                    <ArchiveIcon />
                  </div>
                  <NavLink
                    to="my-sell-listings"
                    className={(navData) =>
                      navData.isActive
                        ? styles.active
                        : styles['nav-items-text']
                    }
                  >
                    {' '}
                    My sell listings
                  </NavLink>
                </div>
              </li>
              <li>
                <div className={styles['nav-items']}>
                  <div className={styles.icon}>
                    <PlusCircleIcon />
                  </div>
                  <NavLink
                    to="create-new-listing"
                    className={(navData) =>
                      navData.isActive
                        ? styles.active
                        : styles['nav-items-text']
                    }
                  >
                    {' '}
                    Create new listing
                  </NavLink>
                </div>
              </li>
              <li>
                <div className={styles['nav-items']}>
                  <div className={styles.icon}>
                    <ShoppingCartIcon />
                  </div>
                  <NavLink
                    to="checkout"
                    className={(navData) =>
                      navData.isActive
                        ? styles.active
                        : styles['nav-items-text']
                    }
                  >
                    {' '}
                    My Cart
                  </NavLink>
                </div>
              </li>
              <li>
                <div className={styles['nav-items']}>
                  <div className={styles.icon}>
                    <ClipboardListIcon />
                  </div>
                  <NavLink
                    to="purchase-history"
                    className={(navData) =>
                      navData.isActive
                        ? styles.active
                        : styles['nav-items-text']
                    }
                  >
                    {' '}
                    Purchase History
                  </NavLink>
                </div>
              </li>
              <li>
                <div className={styles['nav-items']}>
                  <div className={styles.icon}>
                    <CogIcon />
                  </div>
                  <NavLink
                    to="settings"
                    className={(navData) =>
                      navData.isActive
                        ? styles.active
                        : styles['nav-items-text']
                    }
                  >
                    {' '}
                    Settings
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles['main-area']}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
