import HoverDefaultBtn from "../../../Buttons/HoverDefaultBtn/HoverDefaultBtn";
import styles from "./MailSendMenu.module.scss";

const MailSendMenu = ({ isListOpen, setListOpen, setViewData }) => {
  return (
    <div className={styles.wrap}>
      <HoverDefaultBtn
        onClick={() => {
          setViewData((prev) => {
            return { ...prev, writeType: "reply" };
          });
          if (isListOpen) setListOpen(false);
        }}
      >
        <img src="/img/reply.svg" className={styles.icon} alt="reply" />
        회신
      </HoverDefaultBtn>
    </div>
  );
};

export default MailSendMenu;
