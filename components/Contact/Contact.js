import { useState } from "react";
import { SENDFAQ } from "../../utils/fetch/apiConfig";
import { phoneFomatter } from "../../utils/common/fomatter";
import Modal from "../Modal/Modal";
import axios from "axios";
import styles from "./Contact.module.scss";

const titleMap = ["웹캠 오류", "마이크 오류", "스피커 오류", "기타"];

const Contact = ({ setModalOpen }) => {
  const [contactState, setContactState] = useState("WRITE"); //WRITE, DONE, FAIL
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [isLoading, setLoading] = useState(false);

  const checkValue = title && contents && phoneNum;

  const send = async () => {
    if (!checkValue || isLoading) {
      return;
    }
    try {
      setLoading(true);
      await axios.post(SENDFAQ, {
        subject: title,
        content: contents,
        cellPhone: phoneNum,
      });
      setContactState("DONE");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setContactState("FAIL");
    }
  };

  return (
    <Modal setModalOpen={setModalOpen} center darkBg>
      {(() => {
        if (contactState === "WRITE" || contactState === "FAIL") {
          return (
            <div className={styles.wrap}>
              <div className={styles.title}>
                <div />
                문의 작성하기
                <i className="xi-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className={styles.sub_title}>문의 유형</div>
              <div className={styles.menu_wrap}>
                {titleMap.map((titleData, idx) => (
                  <div
                    className={`${styles.item} ${
                      title === titleData ? styles.selected : ""
                    }`}
                    onClick={() => setTitle(titleData)}
                    key={`contact_title_${idx}`}
                  >
                    {titleData}
                  </div>
                ))}
              </div>
              <div className={styles.sub_title}>문의 내용</div>
              <textarea
                className={styles.contents}
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                placeholder="문의 내용을 작성해 주세요."
              />
              <div className={styles.sub_title}>휴대전화 번호</div>
              <input
                className={styles.phoneNum}
                maxLength={13}
                value={phoneFomatter(phoneNum)}
                onChange={(e) =>
                  setPhoneNum(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="답변 받을 휴대전화 번호를 입력해 주세요."
              />
              <div
                className={`${styles.confirm} ${
                  checkValue ? "" : styles.disable
                }`}
                onClick={() => send()}
              >
                작성 완료
              </div>
            </div>
          );
        } else if (contactState === "DONE") {
          return (
            <div className={styles.wrap}>
              <div className={styles.title}>
                <div />
                문의 작성하기
                <i className="xi-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className={styles.suc}>
                문의하신 내용이 접수되었습니다.
                <br />
                신속하게 답변 드리겠습니다.
                <br />
                <br />
                답변 내용은 휴대전화 문자로 전달됩니다.
              </div>
            </div>
          );
        }
      })()}
    </Modal>
  );
};

export default Contact;
