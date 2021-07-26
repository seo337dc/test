import MailWriteReplyContents from "./MailWriteReplyContents/MailWriteReplyContents";
import MailWriteContents from "./MailWriteContents/MailWriteContents";
import styles from "./MailWriteContainer.module.scss";

const MailWriteContainer = ({ viewData, setViewData }) => {
  return (
    <div className={styles.wrap}>
      <MailWriteContents
        editDataList={viewData.re_mail_contents}
        setViewData={setViewData}
        disable={viewData.writeType === "to" ? true : false}
        to_name={viewData.to_name}
      />
      <MailWriteReplyContents viewData={viewData} />
    </div>
  );
};

export default MailWriteContainer;
