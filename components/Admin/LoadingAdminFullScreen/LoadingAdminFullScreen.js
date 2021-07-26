import styles from "./LoadingAdminFullScreen.module.scss";

const LoadingAdminFullScreen = () => {
  return (
    <div className={styles.wrap}>
      <i className="xi-spinner-5 xi-spin" />
    </div>
  );
};

export default LoadingAdminFullScreen;
