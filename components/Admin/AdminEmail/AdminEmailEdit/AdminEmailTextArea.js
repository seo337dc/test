import { useEffect, useState } from "react";
import { replaceNewline } from "../../../../utils/common/fomatter";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import styles from "./AdminEmailTextArea.module.scss";

const AdmintEmailTextArea = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
}) => {
  const [editTextArea, setEditTextArea] = useState("");

  const [fontWeight, setFontWeight] = useState("");
  const [borderBottom, setBorderBottom] = useState("");

  useEffect(() => {
    const { content, fontWeight, borderBottom } = data;
    if (content) setEditTextArea(content);
    if (fontWeight) setFontWeight(fontWeight);
    if (borderBottom) setBorderBottom(borderBottom);
  }, []);

  const onHandleStyleBold = () => {
    if (!fontWeight) {
      setFontWeight("bold");
    } else {
      setFontWeight("");
    }
  };

  const onHandleStyleLine = () => {
    if (!borderBottom) {
      setBorderBottom("1px solid black");
    } else {
      setBorderBottom("");
    }
  };

  const onKeyPressInput = (e) => {
    if (e.key === "Enter") {
      onHandleEditConfirm();
      e.preventDefault();
    }
  };

  const onHandleEditConfirm = () => {
    setEditorDataList((prevEditDataList) => {
      return prevEditDataList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            content: editTextArea,
            fontWeight,
            borderBottom,
          };
        } else {
          return editorData;
        }
      });
    });
  };

  return (
    <AdminEmailLayout
      title={data.type === "textarea" ? "긴 글" : "(한줄내리고)긴 글"}
    >
      <div className={styles.wrap}>
        <div className={styles.input}>
          <p>입력 :</p>
          <textarea
            placeholder="내용을 작성해주세요."
            value={editTextArea}
            onChange={(e) => setEditTextArea(replaceNewline(e.target.value))}
            onKeyPress={onKeyPressInput}
          />
        </div>

        <div className={styles.template}>
          <div
            className={fontWeight ? styles.button_on : styles.button_off}
            onClick={() => onHandleStyleBold()}
          >
            굵게
          </div>
          <div
            className={borderBottom ? styles.button_on : styles.button_off}
            onClick={() => onHandleStyleLine()}
          >
            밑줄
          </div>
        </div>
        <div>
          <div className={styles.btn}>
            <div className={styles.submit} onClick={onHandleEditConfirm}>
              확인
            </div>
            <div
              className={styles.submit}
              onClick={() => onHandleEditDelete(data)}
            >
              삭제
            </div>
          </div>
        </div>
      </div>
    </AdminEmailLayout>
  );
};

export default AdmintEmailTextArea;
