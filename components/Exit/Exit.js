import { useState } from "react";
import { useRouter } from "next/router";
import AlertModal from "../Modal/AlertModal/AlertModal";
import exit from "../../utils/common/exit";
import styles from "./Exit.module.scss";

const Exit = ({ fixed, top, left, right, bottom, black }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const onClick = () => {
    exit(router);
    setModalOpen(false);
  };

  return (
    <div
      className={styles.wrap}
      style={{ position: fixed ? "fixed" : "", top, left, right, bottom }}
    >
      <i
        className="xi-close"
        onClick={() => setModalOpen(true)}
        style={{ color: black ? "#222" : "" }}
      />
      {isModalOpen && (
        <AlertModal
          setModalOpen={setModalOpen}
          blur
          buttonText="종료"
          buttonColor="gold"
          onClick={onClick}
          darkBg
        >
          <div className={styles.modalText}>프로그램을 종료하시겠습니까?</div>
        </AlertModal>
      )}
    </div>
  );
};

export default Exit;
