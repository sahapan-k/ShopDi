import styles from './GenericButton.module.css';

const GenericButton = (props) => {
  return (
    <button
      className={styles.button}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      <div className={styles.text}>{props.text}</div>
    </button>
  );
};

export default GenericButton;
