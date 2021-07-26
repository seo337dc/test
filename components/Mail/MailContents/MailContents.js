import ReactHtmlParser from "react-html-parser";
import Scrollbar from "react-scrollbars-custom";
import MailSendMenu from "./MailSendMenu/MailSendMenu";
import MailUserBox from "./MailUserBox/MailUserBox";
import MailInfo from "./MailInfo/MailInfo";
import BusinessCard from "../BusinessCard/BusinessCard";
import styles from "./MailContents.module.scss";

const MailContents = ({ viewData, setViewData, isListOpen, setListOpen }) => {
  return (
    <div className={styles.wrap}>
      <Scrollbar noDefaultStyles disableTracksWidthCompensation>
        <div className={styles.container}>
          {viewData.mail_kornm === "회신요청" && (
            <MailSendMenu
              isListOpen={isListOpen}
              setListOpen={setListOpen}
              setViewData={setViewData}
            />
          )}
          <MailUserBox data={viewData} />
          <MailInfo infoData={viewData} setViewData={setViewData} />
          <div className={styles.mail_contents}>
            {ReactHtmlParser(viewData.mail_contents)}
          </div>
          <BusinessCard data={viewData.from_info[0]} />
        </div>
      </Scrollbar>
    </div>
  );
};

export default MailContents;
