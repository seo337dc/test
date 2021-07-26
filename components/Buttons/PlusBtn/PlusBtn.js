import styles from "./PlusBtn.module.scss";

const PlusBtn = ({ onClick, children }) => {
  return (
    <div
      className={`${styles.wrap} ${children ? styles.size_up : ""}`}
      onClick={onClick}
    >
      <i className="xi-plus" />
      {children && <div className={styles.text}>{children}</div>}
    </div>
  );
};

export default PlusBtn;
