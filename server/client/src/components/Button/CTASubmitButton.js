import styles from './CTASubmitButton.module.css';

const CTASubmitButton = (props) => {
  return (
    <button className={styles.button}>
      <div className={styles.text}>Sign up</div>
    </button>
  );
};

export default CTASubmitButton;
