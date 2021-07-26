import styles from "./DownBtn.module.scss";

const DownBtn = ({ onClick, flag, children }) => {
  return (
    <div
      className={`${styles.wrap} ${children ? styles.size_up : ""}`}
      onClick={onClick}
    >
      <i className={flag ? "xi-angle-up" : "xi-angle-down"} />
      {children && <div className={styles.text}>{children}</div>}
    </div>
  );
};

export default DownBtn;
