import { useState, useEffect } from "react";
import ModalCommon from "../../Modal/ModalCommon/ModalCommon";
import axios from "axios";
import { SEND_FOLDER_PW } from "../../../utils/fetch/apiConfig";
import useTimer from "../../../utils/customHook/useTimer";
import styles from "./DocsPWModal.module.scss";

const DocsPWModal = ({ setModalOpen, title, categoryCD, setFileList }) => {
  const [input, setInput] = useState("");
  const [isFail, setFail] = useState(false);
  const [failCount, setFailCount] = useState("");

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(SEND_FOLDER_PW, {
        PassWD: input,
        categoryCD,
      });

      if (res.data.result === "OK") {
        setFileList(res.data);
        setModalOpen(false);
      } else {
        if (res.data.listCnt) {
          setFail(true);
          setInput("");
          setFailCount(res.data.listCnt);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <ModalCommon
      setModalOpen={setModalOpen}
      darkBg
      titleImg="/img/locked_modal.svg"
      title={title}
    >
      <form className={styles.wrap}>
        {isFail ? (
          <div className={styles.ctx} style={{ color: "#DA291C" }}>
            입력하신 비밀번호가 올바르지 않습니다.
            <br />
            확인 후 다시 입력하십시오.
          </div>
        ) : (
          <div className={styles.ctx}>
            잠금 폴더입니다.
            <br />
            해당 폴더의 비밀번호를 입력해 주세요.
          </div>
        )}
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button className={styles.btn} onClick={onClick}>
          확인
        </button>
      </form>
    </ModalCommon>
  );
};

export default DocsPWModal;
