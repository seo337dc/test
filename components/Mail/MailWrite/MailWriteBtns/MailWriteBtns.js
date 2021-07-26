import BlocBtn from "../../../Buttons/BlockBtn/BlockBtn";
import styles from "./MailWriteBtns.module.scss";

const MailWriteBtns = ({ setAlertModalType }) => {
  return (
    <div className={styles.wrap}>
      {/* <BlocBtn onClick={() => setAlertModalType("noSave")}>취소</BlocBtn> */}
      <BlocBtn color="silver" onClick={() => setAlertModalType("saveTemp")}>
        임시 저장
      </BlocBtn>
      <BlocBtn color="gold" onClick={() => setAlertModalType("checkSave")}>
        보내기
      </BlocBtn>
    </div>
  );
};

export default MailWriteBtns;
