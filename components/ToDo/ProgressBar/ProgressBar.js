import styles from "./ProgressBar.module.scss";

const ProgressBar = ({ title, current, total }) => {
  return (
    <div className={`${styles.wrap} ${current == total ? styles.done : ""}`}>
      <div className={styles.ctx}>
        <div>{title}</div>
        <div>
          <span>{current}</span>/{total}
        </div>
      </div>
      <div className={styles.proc}>
        <div
          className={styles.bar}
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
