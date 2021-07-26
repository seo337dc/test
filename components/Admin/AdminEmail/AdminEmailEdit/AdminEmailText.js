import { useEffect, useState } from "react";
import { replaceNewline } from "../../../../utils/common/fomatter";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import styles from "./AdminEmailText.module.scss";

const AdminEmailText = ({ setEditorDataList, onHandleEditDelete, data }) => {
  const [editTextArea, setEditTextArea] = useState("");

  const [fontWeight, setFontWeight] = useState("");
  const [borderBottom, setBorderBottom] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const { content, fontWeight, borderBottom, color } = data;
    if (content) setEditTextArea(content);
    if (fontWeight) setFontWeight(fontWeight);
    if (borderBottom) setBorderBottom(borderBottom);
    if (color) setColor(color);
  }, []);

  const onHandleStyleLine = () => {
    if (!borderBottom) {
      setBorderBottom("1px solid black");
    } else {
      setBorderBottom("");
    }
  };

  const onHandleStyleRed = () => {
    if (!color) {
      setColor("red");
      if (borderBottom) setBorderBottom("1px solid red");
    } else {
      setColor("");
      if (borderBottom) setBorderBottom("1px solid black");
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
            color,
          };
        } else {
          return editorData;
        }
      });
    });
  };

  return (
    <AdminEmailLayout
      title={data.type === "text" ? "짧은 글" : "(한줄 내리고)짧은 글"}
    >
      <div className={styles.wrap}>
        <div className={styles.input}>
          <p>입력 :</p>
          <input
            placeholder="내용을 작성해주세요."
            value={editTextArea}
            onChange={(e) => setEditTextArea(replaceNewline(e.target.value))}
            onKeyPress={onKeyPressInput}
          />
          <div
            className={borderBottom ? styles.button_on : styles.button_off}
            onClick={() => onHandleStyleLine()}
          >
            밑줄
          </div>
          <div
            className={color ? styles.button_on : styles.button_off}
            onClick={() => onHandleStyleRed()}
          >
            Red
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

export default AdminEmailText;
