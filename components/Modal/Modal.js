import styles from "./Modal.module.scss";

const Modal = ({
  children,
  style,
  setModalOpen,
  center,
  darkBg,
  blockExit,
}) => {
  return (
    <>
      <div
        className={`${styles.bg} ${darkBg ? styles.darkBg : ""}`}
        onClick={() => !blockExit && setModalOpen(false)}
      />
      <div
        className={`${styles.wrap} ${center ? styles.center : ""}`}
        style={style}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
