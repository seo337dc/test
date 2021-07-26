import styles from "./SearchBox.module.scss";

const SearchBox = ({ value, onChange, placeholder, onClick }) => {
  return (
    <form className={styles.wrap} onSubmit={onClick}>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <i className="xi-search" onClick={onClick} />
    </form>
  );
};

export default SearchBox;
