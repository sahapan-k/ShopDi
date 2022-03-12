import styles from './CTA.module.css';

import CTASubmitButton from '../Button/CTASubmitButton';

const CTA = () => {
  return (
    <div className={styles.cta}>
      <div className={styles.textbox}>
        <header className={styles.header}>
          Love Shopping? Enter your e-mail to get daily deals and discount
          notification
        </header>
        <p>
          Get more than 10% discount - Daily deals and Interesting Items
          Notification, You can cancel anytime with ease. To ensure your
          greatest shopping experience - never ever before that shopping has
          been this pleasant!
        </p>
        <label htmlFor="cta-email">Email address</label>
        <input id="cta-email" type="text" placeholder="youremail@example.com" />
        <CTASubmitButton />
      </div>
      <div className={styles.image}></div>
    </div>
  );
};

export default CTA;
