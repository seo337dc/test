import styles from "./MailUserBox.module.scss";

const MailUserBox = ({ data }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.title}>{data.mail_subject}</div>
        <div className={styles.date}>
          {data.receive_date} ({data.receive_weekday}) {data.receive_Time}
        </div>
      </div>
    </div>
  );
};

export default MailUserBox;
