import { parsedJson, removeHtml } from "../../../utils/common/fomatter";
import moment from "moment";
import styles from "./MessengerListItem.module.scss";

const MessengerListItem = ({ data, clickRoom }) => {
  return (
    <div className={styles.wrap} onClick={() => clickRoom(data)}>
      <div className={styles.title}>
        <div className={styles.text}>{data.From_User}</div>
        <div className={styles.date}>
          {moment(data.Send_Timestamp).format("HH:mm")}
        </div>
      </div>
      <div className={styles.sub_title}>
        <div className={styles.text}>
          {removeHtml(parsedJson(data.Message, true).text)}
        </div>
        {data.Category_CD ? (
          <div className={styles.replied}>답변완료</div>
        ) : Number(data.CntN) !== 0 ? (
          <div className={styles.unread}>{data.CntN}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MessengerListItem;
