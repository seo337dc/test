import { useEffect, useState } from "react";
import { replaceNewline } from "../../../../utils/common/fomatter";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import styles from "./AdminQuestion.module.scss";

const AdminQuestion = ({ setEditorDataList, onHandleEditDelete, data }) => {
  const [editTextArea0, setEditTextArea0] = useState("");
  const [editTextArea1, setEditTextArea1] = useState("");
  const [editTextArea2, setEditTextArea2] = useState("");
  const [editTextArea3, setEditTextArea3] = useState("");

  const [fontWeight, setFontWeight] = useState("");
  const [borderBottom, setBorderBottom] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const { content, fontWeight, borderBottom, color } = data;

    if (content) {
      const {
        editTextArea0,
        editTextArea1,
        editTextArea2,
        editTextArea3,
      } = content;

      if (editTextArea0) setEditTextArea0(editTextArea0);
      if (editTextArea1) setEditTextArea1(editTextArea1);
      if (editTextArea2) setEditTextArea2(editTextArea2);
      if (editTextArea3) setEditTextArea3(editTextArea3);
    }

    if (fontWeight) setFontWeight(fontWeight);
    if (borderBottom) setBorderBottom(borderBottom);
    if (color) setColor(color);
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

  const onHandleStyleRed = () => {
    if (!color) {
      setColor("red");
      if (borderBottom) setBorderBottom("1px solid red");
    } else {
      setColor("");
      if (borderBottom) setBorderBottom("1px solid black");
    }
  };
  const onHandleEditConfirm = () => {
    setEditorDataList((prevEditDataList) => {
      return prevEditDataList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            content: {
              ...editorData.content,
              editTextArea0,
              editTextArea1,
              editTextArea2,
              editTextArea3,
            },
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
    <AdminEmailLayout title={"문항 질문 (세번째 입력 칸은 밑줄 부분)"}>
      <div className={styles.wrap}>
        <div className={styles.input}>
          <input
            placeholder="말머리"
            value={editTextArea0}
            onChange={(e) => setEditTextArea0(replaceNewline(e.target.value))}
          />

          <input
            placeholder="내용을 작성해주세요."
            value={editTextArea1}
            onChange={(e) => setEditTextArea1(replaceNewline(e.target.value))}
          />

          <input
            placeholder="밑줄 내용을 입력"
            value={editTextArea2}
            onChange={(e) => setEditTextArea2(replaceNewline(e.target.value))}
          />

          <input
            placeholder="내용을 작성해주세요."
            value={editTextArea3}
            onChange={(e) => setEditTextArea3(replaceNewline(e.target.value))}
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

export default AdminQuestion;
