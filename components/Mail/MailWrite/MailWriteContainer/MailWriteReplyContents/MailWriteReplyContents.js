import ReactHtmlParser from "react-html-parser";
import styles from "./MailWriteReplyContents.module.scss";

const MailWriteReplyContents = ({ viewData }) => {
  return (
    <div className={styles.wrap}>
      ------------------ 원본 메일 ------------------
      <div className={styles.container}>
        <div>발신: {viewData.from_name}</div>
        <div>
          수신: {viewData.to_name.split("  ")[0]}{" "}
          {viewData.to_name.split("  ")[1]}
        </div>
        <div>
          날짜: {viewData.receive_date} {viewData.receive_weekday}{" "}
          {viewData.receive_Time}
        </div>
        <div>
          참조:{" "}
          {viewData.cc_name.length > 0
            ? viewData.cc_name
                .map((cc) => {
                  return `${cc.u_name} ${cc.u_position}`;
                })
                .join("; ")
            : ""}
        </div>
        <div>제목: {viewData.mail_subject}</div>
        <div className={styles.no_flex}>
          {ReactHtmlParser(viewData.mail_contents)}
        </div>
      </div>
    </div>
  );
};

export default MailWriteReplyContents;
