import { timerFomatter } from "../../utils/common/fomatter";
import styles from "./Timer.module.scss";

const SubTimer = ({ time, isTest }) => {
  return (
    <div className={styles.timer}>
      {isTest ? (
        <div className={styles.test_title}>L-TAB 사전점검</div>
      ) : (
        <>
          <div className={styles.date}>남은 시간</div>
          <div className={styles.time}>{timerFomatter(time)}</div>
        </>
      )}
    </div>
  );
};

export default SubTimer;
