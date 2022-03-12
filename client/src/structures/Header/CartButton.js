import styles from './CartButton.module.css';

import { ShoppingCartIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = () => {
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <div onClick={toggleCartHandler}>
      <ShoppingCartIcon className={styles.cartIcon} />
    </div>
  );
};

export default CartButton;
