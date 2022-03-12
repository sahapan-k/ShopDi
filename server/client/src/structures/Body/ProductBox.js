import React from 'react';
import Swal from 'sweetalert2';

import styles from './ProductBox.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const ProductBox = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const addItemToCartHandler = () => {
    if (isLogin) {
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
      Swal.fire({
        position: 'top',
        toast: true,
        icon: 'success',
        title: 'item added to your cart!',
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        toast: true,
        title: 'Please login before add any item to your cart!',
        showConfirmButton: false,
        timer: 4000,
        color: '#ff3333',
      });
    }
  };

  return (
    <div>
      <div className={styles['item-detail-mainbox']}>
        <div className={styles['item-image-box']}>
          <div className={styles['item-image-frame']}>
            <img
              src={`/img/items/${item.itemImage}`}
              alt="product"
              className={styles['item-image']}
            />
          </div>
          <p className={styles['image-disclaimer']}>
            Product Image provided by Seller
          </p>
        </div>
        <div className={styles['item-description-box']}>
          <p className={styles['item-header']}>{item.name}</p>
          <div className={styles['price-rating-box']}>
            <p className={styles['price-box']}>{item.price}$</p>
            <p className={styles['rating-box']}></p>
          </div>
          <div className={styles['seller-box']}>
            <img
              src={`/img/users/${item.seller.profilePhoto}`}
              alt="seller"
              className={styles['seller-profile-image']}
            />
            <div className={styles['seller-name-box']}>
              <p className={styles['seller-banner']}>Seller</p>
              <p className={styles['seller-name']}>{item.seller.name}</p>
            </div>
          </div>
          <div>
            <p className={styles['stock-available']}>
              <span className={styles['available-number']}>
                {item.stockNumber}
              </span>
              piece available
            </p>
          </div>
          <div className={styles['description-box']}>{item.description}</div>
          <div>
            <button
              className={styles['add-to-cart-button']}
              onClick={addItemToCartHandler}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
