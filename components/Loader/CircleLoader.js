import styles from "./CircleLoader.module.scss";

const CircleLoader = ({ style }) => {
  return <div style={style} className={styles.wrap} />;
};

export default CircleLoader;
