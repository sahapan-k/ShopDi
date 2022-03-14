import styles from './CTASubmitButton.module.css';
import Swal from 'sweetalert2';

const CTASubmitButton = (props) => {
  const ctaSubmitHandler = () => {
    Swal.fire({
      icon: 'error',
      title: 'Not Implemented',
      text: 'The Email Subscription System is not yet implemented!',
    });
  };

  return (
    <button className={styles.button} onClick={ctaSubmitHandler}>
      <div className={styles.text}>Sign up</div>
    </button>
  );
};

export default CTASubmitButton;
