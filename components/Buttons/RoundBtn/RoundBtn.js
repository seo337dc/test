import styles from "./RoundBtn.module.scss";

const RoundBtn = ({ style, children, type }) => {
  return (
    <div className={`${styles.wrap} ${type ? styles[type] : ""}`} style={style}>
      {children}
    </div>
  );
};

export default RoundBtn;
