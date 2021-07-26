import { useState } from "react";
import Modal from "../../../Modal/Modal";
import ConfirmModal from "../../../Modal/ConfirmModal/ConfirmModal";
import styles from "./RegDetailModal.module.scss";

const RegDetailModal = ({
  id,
  width,
  height,
  top,
  left,
  setModalOpen,
  isMine,
}) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <Modal style={{ top, left, zIndex: 10002 }} setModalOpen={setModalOpen}>
      <div
        className={styles.wrap}
        style={{ width, height, borderColor: isMine ? "#DA291C" : "" }}
      >
        <div className={styles.header}>
          회의실 예약
          <i className="xi-close-thin" onClick={() => setModalOpen(false)} />
        </div>

        <div className={styles.item}>
          <div className={styles.title}>예약자</div>
          <div className={styles.ctx}>테스트</div>
        </div>

        <div className={styles.item}>
          <div className={styles.title}>시간</div>
          <div className={styles.ctx}>
            테스트
            <br />
            테스트
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.title}>회의실</div>
          <div className={styles.ctx}>테스트</div>
        </div>

        <div className={styles.item}>
          <div className={styles.title}>사용목적</div>
          <div className={styles.ctx} style={{ height: 45 }}>
            테스트
          </div>
        </div>

        {isMine && (
          <div className={styles.btn_wrap}>
            <div className={styles.btn}>수정</div>
            <div
              className={`${styles.btn} ${styles.del}`}
              onClick={() => setDeleteModalOpen(true)}
            >
              삭제
            </div>
          </div>
        )}
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          setModalOpen={setDeleteModalOpen}
          yesText="삭제"
          yesStyle={{
            border: "1px solid #DA291C",
            color: "#ffffff",
            backgroundColor: "#DA291C",
          }}
          noText="취소"
          noStyle={{
            border: "1px solid #ACACAC",
            color: "#ACACAC",
            backgroundColor: "#ffffff",
          }}
          onYesClick={() => {}}
          onNoClick={() => setDeleteModalOpen(false)}
        >
          <div className={styles.del_wrap}>
            <img src="/img/memo_modal_trash.svg" alt="trash" />
            해당 예약을 삭제하시겠습니까?
          </div>
        </ConfirmModal>
      )}
    </Modal>
  );
};

export default RegDetailModal;
