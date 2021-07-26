import React from "react";
import styles from "./MailCard.module.scss";

const MailCardTo = ({ cardData, onHandleClickMailCard }) => {
  return (
    <div className={styles.wrap} onClick={onHandleClickMailCard}>
      <div className={styles.name}>
        {cardData.to_name}
        <div className={styles.date}>{cardData.sent_time}</div>
      </div>

      <div className={styles.title}>{cardData.mail_subject}</div>
      <div />
    </div>
  );
};

export default MailCardTo;
