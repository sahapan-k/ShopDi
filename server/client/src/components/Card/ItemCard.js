import styles from './ItemCard.module.css';

import styled from 'styled-components';
import { Star } from '@styled-icons/boxicons-solid/Star';
import { Link } from 'react-router-dom';

const StarIcon = styled(Star)`
  width: 1.6rem;
  height: 1.6rem;
  color: #d4af37;
`;

const ItemCard = (props) => {
  return (
    <Link className={styles.itemcard} to={`/items/${props.id}`}>
      <img
        className={styles['itemcard-img']}
        src={`/img/items/${props.image}`}
        alt="items-for-sale"
      />
      <div className={styles.itemcontent}>
        <p className={styles.itemname}>{props.name}</p>
        <div className={styles.rating}>
          <StarIcon />
          <p>{props.rating ? `${props.rating}` : 'no rating yet'}</p>
        </div>
        <p className={styles.price}>
          <strong>{props.price}</strong>$
        </p>
      </div>
    </Link>
  );
};

export default ItemCard;
