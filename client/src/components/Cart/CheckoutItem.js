import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import styles from './CheckoutItem.module.css';

const CheckoutItem = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const itemQuantityInputRef = useRef();

  const addItemToCartHandler = () => {
    dispatch(
      authActions.addItemToCart({
        image: item.image,
        id: item.id,
        price: item.price,
        name: item.name,
        sellerName: item.sellerName,
        sellerProfilePhoto: item.sellerProfilePhoto,
      })
    );
  };
  const removeItemFromCartHandler = () => {
    dispatch(
      authActions.removeItemFromCart({
        id: item.id,
      })
    );
  };

  const removeItemFromCartCompletelyHandler = () => {
    dispatch(
      authActions.removeItemFromCartCompletely({
        id: item.id,
      })
    );
  };

  return (
    <div className={styles['checkout-item-box']}>
      <div className={styles['seller-box']}>
        <p className={styles['seller-text']}>Seller</p>
        <img
          className={styles['seller-photo']}
          src={`/img/users/${item.sellerProfilePhoto}`}
          alt="seller"
        />
        <p className={styles['seller-name']}>{item.sellerName}</p>
      </div>
      <div className={styles['item-box']}>
        <div className={styles['item-image-box']}>
          <img
            className={styles['item-image']}
            src={`/img/items/${item.image}`}
            alt="item"
          />
        </div>
        <div className={styles['item-description-box']}>
          <p className={styles['item-name']}>{item.name}</p>
          <p className={styles['item-quantity']}>x{item.quantity}</p>
        </div>

        <div className={styles['quantity-adjust']}>
          <button
            className={styles['quantity-adjust-button']}
            onClick={addItemToCartHandler}
          >
            +
          </button>
          <input
            className={styles['quantity-adjust-input']}
            ref={itemQuantityInputRef}
            value={item.quantity}
            readOnly
          />
          <button
            className={styles['quantity-adjust-button']}
            onClick={removeItemFromCartHandler}
          >
            -
          </button>
        </div>

        <div className={styles['item-price-box']}>
          <p className={styles['item-price']}>{item.price}$</p>
          <button
            className={styles.remove}
            onClick={removeItemFromCartCompletelyHandler}
          >
            ×
          </button>
        </div>
      </div>
      <div className={styles['item-status']}>
        <p className={styles['status-text']}>STATUS: NOT IMPLEMENTED</p>
        <p className={styles['order-sum']}>
          Order Total:
          <span className={styles['order-total-number']}>
            {item.totalPrice}$
          </span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutItem;
