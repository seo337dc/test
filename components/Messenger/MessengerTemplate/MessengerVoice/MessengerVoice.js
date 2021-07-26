import CirclePercentagePlayer from "../../../CirclePercentagePlayer/CirclePercentagePlayer";
import parser from "react-html-parser";
import moment from "moment";
import { parsedJson } from "../../../../utils/common/fomatter";
import commonStyles from "../MessengerCommonStyle.module.scss";
import { regDQ } from "../../../../utils/common/dataConfig";
import styles from "./MessengerVoice.module.scss";

const MessengerVoice = ({ data }) => {
  return (
    <div className={commonStyles.wrap}>
      <div className={commonStyles.who}>{data.From_User}</div>
      <div className={commonStyles.text}>
        <div className={styles.wrap}>
          <div className={styles.text}>
            {parser(parsedJson(data.Message).text?.replace(regDQ, '"'))}
          </div>
          {parsedJson(data.Message).voiceDataSrc && (
            <CirclePercentagePlayer
              radius={40}
              borderWidth={5}
              src={parsedJson(data.Message).voiceDataSrc}
            />
          )}
        </div>
        <div className={commonStyles.date}>
          {moment(data.Send_Timestamp).format("HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default MessengerVoice;
