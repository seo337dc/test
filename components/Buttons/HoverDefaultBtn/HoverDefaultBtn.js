import styles from "./HoverDefaultBtn.module.scss";

const HoverDefaultBtn = ({ children, onClick }) => {
  return (
    <div className={styles.wrap} onClick={onClick}>
      {children}
    </div>
  );
};

export default HoverDefaultBtn;
