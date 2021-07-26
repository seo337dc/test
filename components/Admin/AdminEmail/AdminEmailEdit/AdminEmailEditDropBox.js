import { useEffect, useState } from "react";
import { replaceNewline } from "../../../../utils/common/fomatter";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import styles from "./AdminEmailEditDropBox.module.scss";

const AdminEmailEditDropBox = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
  Intern_Quest_ID,
}) => {
  const [dropBoxInput, setDropBoxInput] = useState("");
  const [code, setCode] = useState({ key: Intern_Quest_ID + "_", answer: "" });
  const [editDropBoxList, setEditDropBoxList] = useState([]);
  const [width, setWidth] = useState("");

  useEffect(() => {
    const { code, content, width } = data;
    if (code) setCode(code);
    if (content) setEditDropBoxList(content);
    if (width) setWidth(width);
  }, [data]);

  // --> 드롭박스 내용 추가
  const onHandleDropBoxAdd = () => {
    if (!dropBoxInput) {
      alert("내용을 작성해주세요.");
      return;
    }

    const addList = editDropBoxList.concat({
      value: replaceNewline(dropBoxInput),
    });

    setEditDropBoxList(
      addList.map((dropbox, index) => {
        return { index: index + "", ...dropbox };
      })
    );
    setDropBoxInput("");
  };

  const onKeyPressAddDropbox = (e) => {
    if (e.key === "Enter") {
      onHandleDropBoxAdd();
      e.preventDefault();
    }
  };

  // --> 각 드롭박스 input 수정
  const onHandleDropBoxChange = (e, index) => {
    setEditDropBoxList(
      editDropBoxList.map((dropbox) => {
        if (index === dropbox.index) {
          return { ...dropbox, value: replaceNewline(e.target.value) };
        } else {
          return dropbox;
        }
      })
    );
  };

  // --> 각 드롭박스 답 선택 시
  const onHandleDropBoxCheck = (index) => {
    setEditDropBoxList(
      editDropBoxList.map((dropbox) => {
        if (index === dropbox.index) {
          return { ...dropbox, answer: true };
        } else {
          return { ...dropbox, answer: false };
        }
      })
    );
  };

  // --> 드롭박스 내용 삭제
  const onHandleDropBoxDel = (index) => {
    const delList = editDropBoxList.filter(
      (editDropBoxState) => editDropBoxState.index !== index
    );
    setEditDropBoxList(
      delList.map((dropbox, index) => {
        return { index: index + "", ...dropbox };
      })
    );
  };

  // --> 생성한 드롭박스 정보 전송
  const onHandleEditConfirm = () => {
    let isAnswer = false;
    let isValue = true;

    if (!code.key) {
      alert("고유 코드를 작성해주세요");
      return;
    }

    if (!editDropBoxList.length) {
      alert("내용이 없습니다.");
      return;
    }

    if (editDropBoxList.length < 2) {
      alert("2개 이상 내용이 필요합니다.");
      return;
    }

    editDropBoxList.forEach((editDropBox) => {
      if (editDropBox.answer) isAnswer = true;
      if (!editDropBox.value) isValue = false;
    });

    if (!isAnswer) {
      alert("문제에 대한 답을 선택해주세요.");
      return;
    }

    if (!isValue) {
      alert("내용이 없는 부분이 있습니다.");
      return;
    }

    let answer = "";
    for (let i = 0; i < editDropBoxList.length; i++) {
      if (editDropBoxList[i].answer) {
        answer = parseInt(editDropBoxList[i].index) + 1;
      }
    }

    setEditorDataList((prevEditDataList) =>
      prevEditDataList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            content: editDropBoxList,
            code: { ...code, answer: answer + "" },
            width,
          };
        } else {
          return editorData;
        }
      })
    );
  };

  return (
    <AdminEmailLayout type="dropbox" title="Drop Box">
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div className={styles.code}>
            <span>고유 코드 : </span>
            <input
              value={code.key.trim()}
              name="key"
              placeholder="고유 코드를 작성해주세요."
              onChange={(e) =>
                setCode({ ...code, [e.target.name]: e.target.value })
              }
            />
            <span>넓이 : </span>
            <input
              type="number"
              value={width}
              name="width"
              placeholder="기본 150"
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <span>목록 추가 : </span>
            <textarea
              value={dropBoxInput}
              placeholder="추가할 목록을 작성해주세요."
              onChange={(e) => setDropBoxInput(replaceNewline(e.target.value))}
              onKeyPress={onKeyPressAddDropbox}
            />
            <div className={styles.add} onClick={onHandleDropBoxAdd}>
              추가
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.list_wrap}>
            <div className={styles.list_container}>
              {editDropBoxList.map((dropboxState, index) => {
                return (
                  <div
                    className={styles.dropbox}
                    key={index}
                    value={dropboxState.value}
                  >
                    <i
                      className={
                        dropboxState.answer
                          ? "xi-check-square-o"
                          : "xi-checkbox-blank"
                      }
                      onClick={() => onHandleDropBoxCheck(dropboxState.index)}
                    />

                    <textarea
                      type="text"
                      placeholder="내용을 작성해주세요."
                      value={dropboxState.value}
                      onChange={(e) =>
                        onHandleDropBoxChange(e, dropboxState.index)
                      }
                    />

                    <i
                      className="xi-close-circle"
                      onClick={() => {
                        onHandleDropBoxDel(dropboxState.index);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.button_container}>
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

export default AdminEmailEditDropBox;
