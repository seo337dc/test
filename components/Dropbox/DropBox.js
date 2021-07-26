import styles from "./DropBox.module.scss";

const DropBox = ({ children, style, setDropBoxOpen }) => {
  return (
    <>
      <div className={styles.wrap} style={style}>
        {children}
      </div>
      <div className={styles.bg} onClick={() => setDropBoxOpen(false)} />
    </>
  );
};

export default DropBox;
