import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from './CartItem.module.css';

import { authActions } from '../../store/auth-slice';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { item } = props;
  const itemQuantityInputRef = useRef();
  const addItemToCartHandler = () => {
    dispatch(
      authActions.addItemToCart({
        image: item.itemImage,
        id: item.id,
        price: item.price,
        name: item.name,
        sellerName: item.seller.name,
        sellerProfilePhoto: item.seller.profilePhoto,
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
    <div className={styles['item-container']}>
      <div className={styles['img']}>
        <div>
          <img
            src={`/img/items/${item.image}`}
            alt="cart-item"
            className={styles['image']}
          />
        </div>
      </div>
      <div className={styles['description-box']}>
        <div className={styles['item-name']}>
          <p>{item.name}</p>
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
      </div>
      <div className={styles['price-box']}>
        <p className={styles['price-box-text']}>{item.price}$</p>
        <button
          className={styles.remove}
          onClick={removeItemFromCartCompletelyHandler}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CartItem;
