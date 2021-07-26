import ModalCommon from "../ModalCommon/ModalCommon";
import styles from "./AlertModal.module.scss";

const AlertModal = ({
  setModalOpen,
  children,
  onClick,
  buttonText = "확인",
  blur,
  buttonColor = "gray",
  darkBg,
}) => {
  return (
    <ModalCommon setModalOpen={setModalOpen} center blur={blur} darkBg={darkBg}>
      {children}
      <div className={styles.btn_wrap}>
        <div
          className={`${styles.btn} ${styles[buttonColor]}`}
          onClick={onClick}
        >
          {buttonText}
        </div>
      </div>
    </ModalCommon>
  );
};

export default AlertModal;
