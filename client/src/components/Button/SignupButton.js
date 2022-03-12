import styles from './SignupButton.module.css';

const SignupButton = () => {
  return (
    <button className={styles.button}>
      <div className={styles.text}>signup now</div>
    </button>
  );
};

export default SignupButton;
