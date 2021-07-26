import styles from "./AdminNav.module.scss";

const AdminNav = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.logo_container}>
        <img src="/img/INSA_LOGO_white.svg" alt="logo" />
      </div>
      <div className={styles.user_container}>
        <i className="xi-user-o" />
      </div>
    </div>
  );
};

export default AdminNav;
