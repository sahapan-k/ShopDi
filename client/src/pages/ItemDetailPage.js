import React, { useEffect, useState } from 'react';
import styles from './ItemDetailPage.module.css';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import Cart from '../components/Cart/Cart';
import Header from '../structures/Header/Header';
import Footer from '../structures/Footer/Footer';
import ProductBox from '../structures/Body/ProductBox';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const ItemDetailPage = (props) => {
  const { itemId } = useParams();
  const [item, setLoadedItem] = useState({});
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.showCart);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isUnmount = false;
    const fetchItemFromStore = async () => {
      dispatch(uiActions.uiStartLoading());
      const response = await axios({
        method: 'GET',
        url: `/api/v1/items/${itemId}`,
        // url: `http://localhost:5000/api/v1/items/${itemId}`,
      });
      const { foundItem } = response.data.data;
      if (!isUnmount) {
        setLoadedItem(foundItem);
        setIsLoading(false);
      }
      window.scrollTo(0, 0);
      dispatch(uiActions.uiFinishedLoading());
    };

    fetchItemFromStore();
    return () => {
      isUnmount = true;
    };
  }, [dispatch, itemId]);

  return (
    <>
      {cartIsVisible && <Cart />}
      <Header />
      <div className={styles['item-detail-frame']}>
        {isLoading && (
          <p className={styles['loading-textbox']}>Currently loading</p>
        )}
        {!isLoading && item && <ProductBox item={item} />}
      </div>
      <Footer />
    </>
  );
};

export default ItemDetailPage;
