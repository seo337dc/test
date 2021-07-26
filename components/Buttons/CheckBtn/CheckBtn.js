import styles from "./CheckBtn.module.scss";

const CheckBtn = ({ color, value = false, onChange }) => {
  return (
    <div
      className={styles.wrap}
      style={{
        backgroundColor: color,
        color: value ? "#ffffff" : "transparent",
      }}
      onClick={onChange}
    >
      <i className="xi-check" />
    </div>
  );
};

export default CheckBtn;
