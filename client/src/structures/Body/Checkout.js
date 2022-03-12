import React, { useRef } from 'react';
import styles from './Checkout.module.css';

import CheckoutItem from '../../components/Cart/CheckoutItem';

import { useSelector } from 'react-redux';

const Checkout = () => {
  const cartItems = useSelector((state) => state.auth.items);
  const customAddressInputRef = useRef();
  const cartTotalPrice = cartItems.reduce(
    (total, items) => items.totalPrice + total,
    0
  );
  const cartTotalQuantity = cartItems.reduce(
    (total, items) => items.quantity + total,
    0
  );

  const checkoutSubmitHandler = () => {
    const enteredCustomAddress = customAddressInputRef.current.value;
  };

  return (
    <div className={styles['checkout-main-box']}>
      {cartItems.length > 0 && (
        <div className={styles['selection-box']}>
          <p className={styles['box-instruction']}>
            Please select your delivery address
          </p>
          <div className={styles['radio-selection']}>
            <div className={styles['input-field']}>
              <input
                type="radio"
                id="address"
                name="address"
                className={styles['radio-button']}
              />
              <label htmlFor="user-address" className={styles['radio-label']}>
                Use your account address
              </label>
            </div>
            <div className={styles['input-field']}>
              <input
                type="radio"
                id="address"
                name="address"
                className={styles['radio-button']}
              />
              <label htmlFor="custom-address" className={styles['radio-label']}>
                Use new address
              </label>
            </div>
            <textarea
              className={styles['custom-address-textarea']}
              ref={customAddressInputRef}
            />
          </div>
        </div>
      )}
      {cartItems.length > 0 ? (
        cartItems.map((item) => <CheckoutItem item={item} key={item.id} />)
      ) : (
        <p className={styles['no-items-warning-text']}>
          No Items currently in your cart! Continue shopping and received
          numerous amount of discount!
        </p>
      )}
      {cartItems.length > 0 && (
        <>
          <div className={styles['checkout-total-box']}>
            <div className={styles['coupon-box']}>
              <p className={styles['coupon-label']}>Coupon:</p>
              <input
                type="text"
                className={styles['coupon-input']}
                placeholder="enter your coupon code"
              />
            </div>
            <div className={styles['total-box']}>
              <div className={styles['total-description']}>
                <p className={styles['total-text']}>
                  Total{' '}
                  <span className={styles['price-number']}>
                    {cartTotalPrice}$
                  </span>{' '}
                </p>
                <p
                  className={styles['total-quantity']}
                >{`${cartTotalQuantity} Item(s)`}</p>
              </div>
            </div>
          </div>
          {cartItems.length > 0 && (
            <div className={styles['selection-box']}>
              <p className={styles['box-instruction']}>
                Please select your payment method
              </p>
              <div className={styles['radio-selection']}>
                <div className={styles['input-field']}>
                  <input
                    type="radio"
                    id="payment-method"
                    name="payment-method"
                    className={styles['radio-button']}
                  />
                  <label
                    htmlFor="payment-method"
                    className={styles['radio-label']}
                  >
                    Cash
                  </label>
                </div>
                <div className={styles['input-field']}>
                  <input
                    type="radio"
                    id="payment-method"
                    name="payment-method"
                    className={styles['radio-button']}
                  />
                  <label
                    htmlFor="payment-method"
                    className={styles['radio-label']}
                  >
                    Credit Card (Secured payment with Stripe)
                  </label>
                </div>
              </div>
            </div>
          )}
          <button
            className={styles['checkout-button']}
            onClick={checkoutSubmitHandler}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
