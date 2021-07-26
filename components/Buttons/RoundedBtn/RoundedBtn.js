import styles from "./RoundedBtn.module.scss";

const RoundedBtn = ({ style, onClick, innerText, reverse, unRead }) => {
  return (
    <div
      className={`${styles.wrap} ${reverse ? styles.reverse : styles.default}`}
      onClick={onClick}
      style={style}
    >
      {innerText}
      {unRead !== undefined && unRead !== 0 && (
        <div className={styles.unRead}>{unRead}</div>
      )}
    </div>
  );
};

export default RoundedBtn;
