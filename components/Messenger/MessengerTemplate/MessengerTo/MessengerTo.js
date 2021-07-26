import moment from "moment";
import parser from "react-html-parser";
import styles from "./MessengerTo.module.scss";

const MessengerTo = ({ data, isLast }) => {
  return (
    <div
      className={styles.wrap}
      style={{
        filter: isLast ? "opacity(1)" : "opacity(0.4)",
      }}
    >
      <div
        className={styles.text}
        style={{ backgroundColor: isLast ? "#DA291C" : "" }}
      >
        {parser(data.Message)}
        <div></div>
        <div className={styles.date}>
          {moment(data.Send_Timestamp).format("HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default MessengerTo;
