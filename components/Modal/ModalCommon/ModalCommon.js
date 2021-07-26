import Modal from "../Modal";
import styles from "./ModalCommon.module.scss";

const ModalCommon = ({
  setModalOpen,
  titleImg,
  title = "",
  children,
  bigTitle,
  darkBg,
  blur,
  blockExit,
  style,
}) => {
  return (
    <Modal
      setModalOpen={setModalOpen}
      center
      darkBg={darkBg}
      blockExit={blockExit}
    >
      <div
        className={`${styles.wrap} ${blur ? styles.blur : ""}`}
        style={{ ...style }}
      >
        <div className={styles.header}>
          {bigTitle && <div />}
          <div className={bigTitle ? styles.bigTitle : styles.title}>
            {titleImg ? <img src={titleImg} alt="modal title img" /> : ""}
            {title}
          </div>
          {!blockExit && (
            <i
              className="xi-close"
              onClick={() => setModalOpen(false)}
              style={{
                fontSize: bigTitle ? 28 : "",
                paddingTop: bigTitle ? 15 : "",
              }}
            />
          )}
        </div>
        <div>{children}</div>
      </div>
    </Modal>
  );
};

export default ModalCommon;
