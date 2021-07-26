import { useEffect, useState } from "react";
import { replaceNewline } from "../../../../../utils/common/fomatter";
import styles from "./AdminTableMeetingContentText.module.scss";

const AdminTableMeetingContentText = ({
  content,
  onHandleContentsTextAdd,
  onHandleContentsListDel,
}) => {
  const [textareaInput, setTextAreaInput] = useState("");

  useEffect(() => {
    if (content.text) setTextAreaInput(content.text);
  }, [content]);

  const onHandleSumbit = () => {
    if (!confirm("텍스트 내용을 추가하시겠습니까?")) return;
    console;
    setContentList((preContentList) =>
      preContentList.map((ctn) => {
        if (ctn.index === content.index) {
          return { ...content, text: textareaInput };
        } else {
          return ctn;
        }
      })
    );
  };

  const onHandleDel = () => {
    if (confirm("텍스트 내용을 삭제하시겠습니까?")) {
      setContentList((preContentList) =>
        preContentList.filter((ctn) => ctn.index !== content.index)
      );
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>입력 :</div>
      <div className={styles.right}>
        <textarea
          placeholder="회의 내용을 입력하세요."
          value={textareaInput}
          onChange={(e) => setTextAreaInput(replaceNewline(e.target.value))}
        />
        <div className={styles.button}>
          <div
            className={styles.btn}
            onClick={() => onHandleContentsTextAdd(content, textareaInput)}
          >
            적용
          </div>
          <div
            className={styles.btn}
            onClick={() => onHandleContentsListDel(content)}
          >
            취소
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTableMeetingContentText;
