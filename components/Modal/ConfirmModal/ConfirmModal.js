import ModalCommon from "../ModalCommon/ModalCommon";
import styles from "./ConfirmModal.module.scss";

const ConfirmModal = ({
  setModalOpen,
  children,
  onYesClick,
  onNoClick,
  yesText = "네",
  noText = "아니오",
  yesStyle = {},
  noStyle = {},
  colorReverse,
}) => {
  return (
    <ModalCommon setModalOpen={setModalOpen} center darkBg>
      {children}
      <div className={styles.btn_wrap}>
        <div
          className={`${styles.btn} ${colorReverse ? styles.yes_re : ""}`}
          onClick={onYesClick}
          style={yesStyle}
        >
          {yesText}
        </div>
        <div
          className={`${styles.btn} ${colorReverse ? styles.no_re : styles.no}`}
          onClick={onNoClick}
          style={noStyle}
        >
          {noText}
        </div>
      </div>
    </ModalCommon>
  );
};

export default ConfirmModal;
