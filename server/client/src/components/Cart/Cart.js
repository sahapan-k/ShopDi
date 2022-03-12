import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CartItem from './CartItem.js';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { useEffect } from 'react';

const Cart = (props) => {
  const retrievedToken = useSelector((state) => state.auth.token);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const cartItems = useSelector((state) => state.auth.items);
  const cartTotalPrice = cartItems.reduce(
    (total, items) => items.totalPrice + total,
    0
  );

  const dispatch = useDispatch();
  const closeButtonHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  const CheckoutButtonHandler = (event) => {
    event.preventDefault();
    dispatch(uiActions.toggleCart());
  };

  useEffect(() => {
    const updateCart = async () => {
      await axios({
        method: 'PATCH',
        url: '/api/v1/users/updateCart',
        // url: 'http://localhost:5000/api/v1/users/updateCart',
        data: {
          cartData: cartItems,
        },
        headers: {
          Authorization: `Bearer ${retrievedToken}`,
        },
      });
    };
    localStorage.setItem('cartData', JSON.stringify(cartItems));
    updateCart();
  }, [cartItems, retrievedToken]);

  return (
    <Modal>
      <header>Your cart</header>
      <div className={styles.description}>
        <span>Item</span>
        <span>Price</span>
      </div>
      <div className={styles['cart-container']}>
        <div className={styles['cart-items']}>
          {!isLogin && (
            <p className={styles['cart-element-warning']}>
              Please login first to keep tracks of your cart
            </p>
          )}
          {isLogin && (
            <>
              {cartItems.length === 0 && (
                <p className={styles['cart-element-warning']}>
                  No items in your cart currently, Start Shopping now!
                </p>
              )}
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </>
          )}
        </div>
      </div>
      <div className={styles.total}>
        <strong>Net sales</strong>
        <div className={styles.price}>
          {isLogin ? (
            <>
              <strong>{cartTotalPrice}</strong>$
            </>
          ) : (
            'N/A'
          )}
        </div>
      </div>
      <div className={styles.action}>
        <button className={styles.close} onClick={closeButtonHandler}>
          Close
        </button>
        <button className={styles['check-out']} onClick={CheckoutButtonHandler}>
          <Link to="/user/checkout">Checkout</Link>
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
