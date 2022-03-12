import styles from './FrontCard.module.css';
import { Link } from 'react-router-dom';

import SignupButton from '../../components/Button/SignupButton';

const FrontCard = () => {
  return (
    <>
      <div className={styles.frontcard}>
        <div className={styles.header}>
          <p>Shop more</p>
          <p className={styles.lastrow}>Save more</p>
        </div>
        <p className={styles.slogan}>Sweet deals... just for you</p>
        <Link to="/register">
          <SignupButton />
        </Link>
      </div>
    </>
  );
};

export default FrontCard;
