import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

import { SocialIcon } from 'react-social-icons';

const year = new Date(Date.now()).getFullYear();

const Footer = () => {
  return (
    <>
      <hr color="#e9ecef" />
      <div className={styles['footer-box']}>
        <div className={styles.mainarea}>
          <div className={styles.firstchild}>
            <div>
              <img
                src="/logo192.png"
                alt="logo"
                className={styles.logofooter}
              />
            </div>
            <div className={styles.socialicon}>
              <SocialIcon
                network="instagram"
                url="https://www.instagram.com/"
                style={{ height: 36, width: 36 }}
              />
              <SocialIcon
                network="facebook"
                url="https://www.facebook.com/"
                style={{ height: 36, width: 36 }}
              />
              <SocialIcon
                network="twitter"
                url="https://twitter.com/"
                style={{ height: 36, width: 36 }}
              />
            </div>
            <div className={styles.text}>
              <p>Copyright © {year} by Sahapan K., All rights reserved.</p>
            </div>
          </div>
          <div className={styles.secondchild}>
            <div className={styles.header}>Contact us</div>
            <ul className={styles.text}>
              <p>+66 12 345 6789</p>
              <p>Bangkok, Thailand</p>
              <li>customer-relation@shopdi.com</li>
            </ul>
          </div>
          <div className={styles.thirdchild}>
            <div className={styles.header}>Account</div>
            <ul className={styles.text}>
              <li>
                <Link to="/register">Create Account</Link>
              </li>
              <li>
                <Link to="/login">Sign in</Link>
              </li>
            </ul>
          </div>
          <div className={styles.fourthchild}>
            <div className={styles.header}>Resource</div>
            <ul className={styles.text}>
              <li>About ShopDi</li>
              <li>Careers with us</li>
              <li>Business Affiliates</li>
            </ul>
          </div>
          <div className={styles.fifthchild}>
            <div className={styles.header}>Company</div>
            <ul className={styles.text}>
              <li>Help center</li>
              <li>Customer Support</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <p className={styles['footer-disclaimer']}>
          The content displayed on the website is for the sole purpose of
          experimenting of website development software and does not represents
          any real values or involved any transactions legally
        </p>
      </div>
    </>
  );
};

export default Footer;
