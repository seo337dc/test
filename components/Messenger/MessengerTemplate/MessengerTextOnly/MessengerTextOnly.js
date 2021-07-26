import parser from "react-html-parser";
import { parsedJson } from "../../../../utils/common/fomatter";
import moment from "moment";
import { regDQ } from "../../../../utils/common/dataConfig";
import styles from "../MessengerCommonStyle.module.scss";

const MessengerTextOnly = ({ data, setSelectedQues }) => {
  return (
    <div
      className={styles.wrap}
      onCopy={(e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        return false;
      }}
    >
      <div className={styles.who}>{data.From_User}</div>
      <div className={styles.text}>
        {parser(parsedJson(data.Message).text?.replace(regDQ, '"'))}
        <div
          className={styles.reply}
          onClick={() => setSelectedQues({ ...data })}
        >
          답장
        </div>
        <div className={styles.date}>
          {moment(data.Send_Timestamp).format("HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default MessengerTextOnly;
