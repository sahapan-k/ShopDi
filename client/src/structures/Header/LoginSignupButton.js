import styles from './LoginSignupButton.module.css';
import { Link } from 'react-router-dom';

const LoginSignupButton = () => {
  return (
    <button className={styles.button}>
      <Link className={styles.link} to="/login">
        <div className={styles.hello}>Hello,</div>
        <div className={styles.loginsignup}>Login & Signup</div>
      </Link>
    </button>
  );
};

export default LoginSignupButton;
