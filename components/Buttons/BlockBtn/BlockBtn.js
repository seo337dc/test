import styles from "./BlockBtn.module.scss";

const BlockBtn = ({ children, color, onClick, style }) => {
  return (
    <div
      className={`${styles.wrap} ${styles[color]}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default BlockBtn;
