import styles from './Searchbar.module.css';

const SearchBar = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search your items here.."
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
