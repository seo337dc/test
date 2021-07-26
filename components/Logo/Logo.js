import styles from "./Logo.module.scss";

const Logo = ({ style }) => {
  return (
    <div className={styles.logo} style={{ ...style }}>
      <img src="/img/lotte_logo.svg" alt="logo" />
    </div>
  );
};

export default Logo;
