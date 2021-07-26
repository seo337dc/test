import { useSelector } from "react-redux";
import Scrollbar from "react-scrollbars-custom";
import { listMap } from "../../../utils/common/dataConfig";
import MailCard from "./MailCard/MailCard";
import MailCardTo from "./MailCard/MailCardTo";
import MailCardTemp from "./MailCard/MailCardTemp";
import AngleBtn from "../../Buttons/AngleBtn/AngleBtn";
import styles from "./MailList.module.scss";

const MailList = ({
  mailType,
  onHandleClickMailCard,
  isListOpen,
  setListOpen,
}) => {
  const mailList = useSelector((state) => state[listMap[mailType]].listData);
  console.log(mailList);
  return (
    <div className={styles.wrap} style={{ minWidth: isListOpen ? "325px" : 0 }}>
      <AngleBtn
        isOpen={isListOpen}
        onClick={() => setListOpen((prev) => !prev)}
      />
      <Scrollbar
        noDefaultStyles
        disableTracksWidthCompensation
        style={{ display: isListOpen ? "" : "none" }}
      >
        {mailList.map((cardData, mailIdx) => {
          if (mailType === "from") {
            return (
              <MailCard
                key={`mail_card_${mailIdx}`}
                cardData={cardData}
                mailType={mailType}
                onHandleClickMailCard={() => {
                  onHandleClickMailCard(cardData);
                }}
              />
            );
          } else if (mailType === "to") {
            return (
              <MailCardTo
                key={`mail_card_to_${mailIdx}`}
                cardData={cardData}
                mailType={mailType}
                onHandleClickMailCard={() => {
                  onHandleClickMailCard(cardData, mailIdx);
                }}
              />
            );
          } else {
            return (
              <MailCardTemp
                key={`mail_card_temp_${mailIdx}`}
                cardData={cardData}
                onHandleClickMailCard={() => {
                  onHandleClickMailCard(cardData, mailIdx);
                }}
              />
            );
          }
        })}
      </Scrollbar>
    </div>
  );
};

export default MailList;
