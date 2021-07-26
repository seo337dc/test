import { useEffect, useState } from "react";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import styles from "./AdminEmailEditInput.module.scss";

const AdminEmailEditInput = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
  Intern_Quest_ID,
}) => {
  const [inputSize, setInputSize] = useState({ width: "200" });
  const [code, setCode] = useState({ key: Intern_Quest_ID + "_", answer: "" });
  const [content, setContent] = useState("");
  const [isNum, setIsNum] = useState(false);

  useEffect(() => {
    const { width, code, content, isNum } = data;
    if (width) setInputSize({ width });
    if (code) setCode(code);
    if (content) setContent(content);
    if (isNum) setIsNum(isNum);
  }, [data]);

  const onkeyPressInput = (e) => {
    if (e.key === "Enter") {
      onHandleEditConfirm();
      e.preventDefault();
    }
  };
  const onHandleEditConfirm = () => {
    if (!content) {
      alert("답을 작성해주세요.");
      return;
    }

    if (!code.key) {
      alert("고유 코드를 작성해주세요.");
      return;
    }

    setEditorDataList((preEditDataList) =>
      preEditDataList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            content,
            code: { ...code, answer: content },
            width: inputSize.width,
            height: inputSize.height,
            isNum,
          };
        } else {
          return editorData;
        }
      })
    );
  };

  return (
    <AdminEmailLayout type="input" title="Input Box">
      <div className={styles.wrap}>
        <div className={styles.main}>
          <span>답 :</span>
          <input
            type={isNum ? "number" : "text"}
            className={styles.content}
            placeholder="내용을 작성해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={onkeyPressInput}
          />

          <span
            className={isNum ? styles.number_on : styles.number_off}
            onClick={() => setIsNum(!isNum)}
          >
            숫자
          </span>

          <span>넓이 :</span>
          <input
            type="number"
            name="width"
            className={styles.width}
            placeholder="기본 : 200"
            value={inputSize.width}
            onChange={(e) =>
              setInputSize({ ...inputSize, [e.target.name]: e.target.value })
            }
          />
          {`px`}
        </div>
        <div className={styles.code}>
          <span>고유 코드 :</span>
          <input
            type="text"
            placeholder="고유 코드"
            name="key"
            value={code.key.trim()}
            onChange={(e) =>
              setCode({ ...code, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className={styles.button_container}>
          <div className={styles.btn} onClick={onHandleEditConfirm}>
            확인
          </div>

          <div className={styles.btn} onClick={() => onHandleEditDelete(data)}>
            삭제
          </div>
        </div>
      </div>
    </AdminEmailLayout>
  );
};

export default AdminEmailEditInput;
