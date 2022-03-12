import styles from './ItemList.module.css';

import ItemCard from '../../components/Card/ItemCard';
import GenericButton from '../../components/Button/GenericButton';
import { useSelector } from 'react-redux';

const ItemList = (props) => {
  const items = useSelector((state) => state.items.storeItems);
  const isLoading = useSelector((state) => state.ui.isLoading);

  return (
    <>
      <div className={styles.itemgrid}>
        {items &&
          !isLoading &&
          items.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              rating={item.rating}
              image={item.itemImage}
            />
          ))}
        {isLoading && (
          <p className={styles['unsuccessfully-fetch-items']}>Loading...</p>
        )}
        {items.length === 0 && !isLoading && (
          <p className={styles['unsuccessfully-fetch-items']}>
            No items on the store matched current category selection
          </p>
        )}
      </div>
      {/* <div className={styles.readmore}>
        <GenericButton text={'Load More'} style={{ alignItems: 'center' }} />
      </div> */}
    </>
  );
};

export default ItemList;
