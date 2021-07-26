import styles from "./SubMemoNav.module.scss";

const SubMemoNav = ({ icon, onClick, clickDelBtn }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.switch_btn} onClick={onClick}>
        <i className={icon} />
      </div>
      <i className="xi-trash" onClick={clickDelBtn} />
    </div>
  );
};

export default SubMemoNav;
