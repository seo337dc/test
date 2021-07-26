import styles from "./InOutBox.module.scss";

const InOutBox = ({ style, isIn, onClick }) => {
  return (
    <div className={styles.wrap} style={style} onClick={onClick}>
      <div className={styles.container}>
        {isIn ? (
          <i className="xi-angle-right" />
        ) : (
          <i className="xi-angle-left" />
        )}
      </div>
    </div>
  );
};

export default InOutBox;
