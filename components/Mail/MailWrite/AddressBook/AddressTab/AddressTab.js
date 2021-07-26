import styles from "./AddressTab.module.scss";

const AddresTab = ({ type, setType }) => {
  return (
    <div className={styles.wrap}>
      <div
        className={`${styles.tab} ${type === "IN" ? styles.tab_selected : ""}`}
        onClick={() => setType("IN")}
      >
        내부
      </div>
      {/* <div
        className={`${styles.tab} ${type === "OUT" ? styles.tab_selected : ""}`}
        onClick={() => setType("OUT")}
      >
        외부
      </div> */}
    </div>
  );
};

export default AddresTab;
