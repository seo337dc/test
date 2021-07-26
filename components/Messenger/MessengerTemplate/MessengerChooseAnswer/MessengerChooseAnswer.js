import parser from "react-html-parser";
import moment from "moment";
import { parsedJson } from "../../../../utils/common/fomatter";
import commonStyles from "../MessengerCommonStyle.module.scss";
import { regDQ } from "../../../../utils/common/dataConfig";
import styles from "./MessengerChooseAnswer.module.scss";

const MessengerChooseAnswer = ({ data, sendChooseAnswer, isEx }) => {
  return (
    <div
      className={commonStyles.wrap}
      onCopy={(e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        return false;
      }}
    >
      <div className={commonStyles.who}>{data.From_User}</div>
      <div className={commonStyles.text}>
        <div className={styles.wrap}>
          <div className={styles.text}>
            {parser(parsedJson(data.Message).text?.replace(regDQ, '"'))}
          </div>
          <div className={styles.ans_wrap}>
            {parsedJson(data.Message).chooseData?.map((ansData, idx) => (
              <div
                className={styles.item}
                key={`messenger_${data.id}_${idx}`}
                style={{
                  justifyContent: parsedJson(data.Message).setLeft
                    ? "flex-start"
                    : "",
                }}
                onClick={() =>
                  isEx
                    ? null
                    : sendChooseAnswer(
                        idx + 1,
                        parsedJson(data.Message).text?.replace(regDQ, '"'),
                        ansData.text,
                        data.Room_IDX,
                        data.Intern_Quest_ID,
                        data.Quest_IDX
                      )
                }
              >
                {ansData.text}
              </div>
            ))}
          </div>
        </div>
        <div className={commonStyles.date}>
          {moment(data.Send_Timestamp).format("HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default MessengerChooseAnswer;
