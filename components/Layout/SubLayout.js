import SubNav from "../SubNav/SubNav";
import styles from "./SubLayout.module.scss";

const SubLayOut = ({ children, time, isTest }) => {
  return (
    <div className={styles.wrap}>
      <SubNav time={time} isTest={isTest} />
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default SubLayOut;
