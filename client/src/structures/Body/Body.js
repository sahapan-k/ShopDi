import styles from './Body.module.css';

import { useSelector } from 'react-redux';

import FrontCard from './FrontCard';
import Banner from '../../components/miscellaneous/Banner';
import HomeNavigator from './HomeNavigator';
import ItemList from './ItemList';
import CTA from '../../components/Card/CTA';

const Body = (props) => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <>
      {isLogin ? <Banner /> : <FrontCard />}
      <div className={styles.midsection}>
        <HomeNavigator />
        <ItemList />
        {!isLogin && <CTA />}
      </div>
    </>
  );
};

export default Body;
