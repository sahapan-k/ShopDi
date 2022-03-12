import React, { useEffect } from 'react';

import axios from 'axios';

import Cart from '../components/Cart/Cart';
import Header from '../structures/Header/Header';
import Body from '../structures/Body/Body';
import Footer from '../structures/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { itemActions } from '../store/item-slice';
import { uiActions } from '../store/ui-slice';

const Home = () => {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.showCart);
  const isSelectAll = useSelector((state) => state.items.queryAll);
  const isSelectElectronics = useSelector(
    (state) => state.items.queryElectronics
  );
  const isSelectBeautyPersonalCare = useSelector(
    (state) => state.items.queryBeautyPersonalCare
  );
  const isSelectFashion = useSelector((state) => state.items.queryFashion);
  const isSelectSportOutdoor = useSelector(
    (state) => state.items.querySportOutdoor
  );
  const isSelectTools = useSelector((state) => state.items.queryTools);
  const isSelectPetSupplies = useSelector(
    (state) => state.items.queryPetSupplies
  );

  let selectionQuery;
  if (isSelectAll) selectionQuery = '';
  if (isSelectElectronics) selectionQuery = '?category=electronics';
  if (isSelectBeautyPersonalCare)
    selectionQuery = '?category=beautyPersonalCare';
  if (isSelectFashion) selectionQuery = '?category=fashion';
  if (isSelectSportOutdoor) selectionQuery = '?category=sportOutdoor';
  if (isSelectTools) selectionQuery = '?category=tools';
  if (isSelectPetSupplies) selectionQuery = '?category=petSupplies';

  //fetch items from store
  useEffect(() => {
    const fetchItemsFromStore = async () => {
      dispatch(uiActions.uiStartLoading());
      const results = await axios({
        method: 'GET',
        url: `/api/v1/items${selectionQuery}`,
        // url: `http://localhost:5000/api/v1/items${selectionQuery}`,
      });
      dispatch(itemActions.setItems(results.data.data.items));
      dispatch(uiActions.uiFinishedLoading());
    };
    fetchItemsFromStore();
  }, [dispatch, selectionQuery]);

  //Update Cart items
  return (
    <>
      {cartIsVisible ? <Cart /> : ''}
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default Home;
