import { useDispatch, useSelector } from 'react-redux';
import styles from './HomeNavigator.module.css';

import { itemActions } from '../../store/item-slice';

const HomeNavigator = () => {
  const dispatch = useDispatch();
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

  const selectAllHandler = () => {
    dispatch(itemActions.setCategoryAll());
  };
  const selectElectronicsHandler = () => {
    dispatch(itemActions.setCategoryElectronics());
  };
  const selectBeautyPersonalCareHandler = () => {
    dispatch(itemActions.setCategoryBeautyPersonalCare());
  };
  const selectFashionHandler = () => {
    dispatch(itemActions.setCategoryFashion());
  };
  const selectSportOutdoorHandler = () => {
    dispatch(itemActions.setCategorySportOutdoor());
  };
  const selectToolsHandler = () => {
    dispatch(itemActions.setCategoryTools());
  };
  const selectPetSuppliesHandler = () => {
    dispatch(itemActions.setCategoryPetSupplies());
  };

  return (
    <nav className={styles.homenavigator}>
      <ul className={styles.tablists}>
        <li
          onClick={selectAllHandler}
          className={isSelectAll ? styles['selected'] : ''}
        >
          All
        </li>
        <li
          onClick={selectElectronicsHandler}
          className={isSelectElectronics ? styles['selected'] : ''}
        >
          Electronics
        </li>
        <li
          onClick={selectBeautyPersonalCareHandler}
          className={isSelectBeautyPersonalCare ? styles['selected'] : ''}
        >
          Beauty & Personal Care
        </li>
        <li
          onClick={selectFashionHandler}
          className={isSelectFashion ? styles['selected'] : ''}
        >
          Fashion
        </li>
        <li
          onClick={selectSportOutdoorHandler}
          className={isSelectSportOutdoor ? styles['selected'] : ''}
        >
          Sport & Outdoor
        </li>
        <li
          onClick={selectToolsHandler}
          className={isSelectTools ? styles['selected'] : ''}
        >
          Tools
        </li>
        <li
          onClick={selectPetSuppliesHandler}
          className={isSelectPetSupplies ? styles['selected'] : ''}
        >
          Pet Supplies
        </li>
      </ul>
    </nav>
  );
};

export default HomeNavigator;
