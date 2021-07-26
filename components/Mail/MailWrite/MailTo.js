import React from "react";
import Scrollbar from "react-scrollbars-custom";
import MailInfo from "../MailContents/MailInfo/MailInfo";
import MailUserBox from "../MailContents/MailUserBox/MailUserBox";
import MailWriteContainer from "./MailWriteContainer/MailWriteContainer";
import styles from "./MailWrite.module.scss";

const MailTo = ({ viewData, setViewData }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container_to}>
        <Scrollbar noDefaultStyles disableTracksWidthCompensation>
          <div className={styles.inner_container}>
            <div style={{ padding: "0px 20px" }}>
              <MailUserBox data={viewData} />
              <MailInfo infoData={viewData} isTo={true} />
            </div>

            <MailWriteContainer viewData={viewData} setViewData={setViewData} />
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default MailTo;
