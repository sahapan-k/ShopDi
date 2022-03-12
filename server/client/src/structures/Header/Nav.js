import styles from './/Nav.module.css';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchBar from './Searchbar';
import UserButton from '../../components/Button/UserButton';
import LoginSignupButton from './LoginSignupButton';
import LogoutButton from '../../components/Button/LogoutButton';
import CartButton from './CartButton';

const Nav = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">
              <img src="/logo192.png" alt="logo" />
            </Link>
          </li>
          <li>
            <SearchBar />
          </li>
          {isLogin ? (
            <li>
              <UserButton />
            </li>
          ) : (
            <li>
              <LoginSignupButton />
            </li>
          )}
          {isLogin ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            ''
          )}
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
