import RoundBtn from "../../../Buttons/RoundBtn/RoundBtn";
import {
  mailTodivideString,
  kornmStyleMap,
} from "../../../../utils/common/dataConfig";
import styles from "./MailCard.module.scss";

const MailCard = ({ cardData, onHandleClickMailCard }) => {
  // const userInfo = useSelector((state) => state.userInfo);
  return (
    <div className={styles.wrap} onClick={onHandleClickMailCard}>
      {cardData.read_yn === "N" && <div className={styles.dot} />}
      <div
        className={`${styles.name} ${
          cardData.read_yn === "N" ? styles.unread_name : ""
        }`}
      >
        {/* {config === "to" &&
          data.to_name.split(mailTodivideString).length > 1 &&
          `${data.to_name.split(mailTodivideString)[0]} 외 ${
            data.to_name.split(mailTodivideString).length - 1
          }`}*/}
        {/*{config === "to" &&
          data.to_name.split(mailTodivideString).length === 1 &&
          `${data.to_name.split(mailTodivideString)[0]} `}

        {config === "from" && data.from_name}
        {config === "temp" && `${userInfo.Tester_Name} 사원`}

        <div className={styles.date}>
          {config === "to" ? data.sent_time : data.receive_time}
        </div>

          `${data.to_name.split(mailTodivideString)[0]} `}*/}
        {/* {config === "temp" && userInfo.Tester_Name}*/}
        {cardData.from_name}
        <div className={styles.date}>{cardData.receive_time}</div>
      </div>
      <div
        className={`${styles.title} ${
          cardData.read_yn === "N" ? styles.unread_title : ""
        }`}
      >
        {cardData.attach_file_yn === "Y" && <i className="xi-paperclip" />}
        {cardData.mail_subject}
      </div>

      <div className={styles.contents}>
        {cardData.mail_contents.indexOf("<img") === 0
          ? ""
          : cardData.mail_contents}
      </div>
      {/* {(config === "to" || config === "temp") && (
        <div className={styles.contents}>{data.show_content}</div>
      )} */}

      <RoundBtn type={kornmStyleMap[cardData.mail_cd]?.type}>
        {cardData.mail_kornm}
      </RoundBtn>
    </div>
  );
};

export default MailCard;
