import { useSelector } from "react-redux";
import styles from "./MailCard.module.scss";
const MailCardTemp = ({ cardData, onHandleClickMailCard }) => {
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <div className={styles.wrap} onClick={onHandleClickMailCard}>
      <div className={styles.name}>
        {`${userInfo.Tester_Name} 사원`}
        <div className={styles.date}>{cardData.receive_time}</div>
      </div>
      <div className={styles.title}>{cardData.mail_subject}</div>
      <div />
    </div>
  );
};

export default MailCardTemp;
