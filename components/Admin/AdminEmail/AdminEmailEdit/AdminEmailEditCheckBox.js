import { useEffect, useState } from "react";
import { replaceNewline } from "../../../../utils/common/fomatter";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import styles from "./AdminEmailEditCheckBox.module.scss";

const AdminEmailEditCheckBox = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
  Intern_Quest_ID,
}) => {
  const [question, setQuestion] = useState("");
  const [code, setCode] = useState({ key: Intern_Quest_ID + "_", answer: "" });
  const [checkboxInput, setCheckboxInput] = useState("");
  const [checkboxList, setCheckboxList] = useState([]);

  useEffect(() => {
    const { question, code, content } = data;
    if (question) setQuestion(question);
    if (code) setCode(code);
    if (content) setCheckboxList(content);
  }, [data]);

  //체크박스 내용 추가 기능
  const onHandleCheckboxAdd = () => {
    if (!checkboxInput) {
      alert("값을 입력하시오");
      return;
    }

    const addList = checkboxList.concat({
      value: checkboxInput,
    });

    setCheckboxList(
      addList.map((checkbox, index) => {
        return { index: index + "", ...checkbox };
      })
    );
    setCheckboxInput("");
  };

  const onKeyPressAddCheckBox = (e) => {
    if (e.key === "Enter") {
      onHandleCheckboxAdd();
      e.preventDefault();
    }
  };

  //라디오 체크 기능
  const onHandleCheckboxCheck = (index) => {
    setCheckboxList(
      checkboxList.map((checkBoxState) => {
        if (index === checkBoxState.index) {
          return {
            ...checkBoxState,
            answer: !checkBoxState.answer ? true : false,
          };
        } else {
          return { ...checkBoxState };
        }
      })
    );
  };

  //체크박스 내용 변경 기능
  const onHandleCheckboxChange = (e, checkbox) => {
    const newCheckBoxSelectList = checkboxList.map((checkBoxState, index) => {
      if (checkbox.index === checkBoxState.index) {
        return {
          ...checkBoxState,
          index: index + "",
          value: replaceNewline(e.target.value),
        };
      } else {
        return checkBoxState;
      }
    });
    setCheckboxList(newCheckBoxSelectList);
  };

  //체크박스 지우는 기능
  const onHandleCheckboxDel = (index) => {
    const nowState = checkboxList.filter(
      (checkBoxState) => checkBoxState.index !== index
    );
    setCheckboxList(
      nowState.map((state, index) => {
        return { ...state, index: index + "" };
      })
    );
  };

  //확인 기능
  const onHandleEditConfirm = () => {
    if (!checkboxList.length) {
      alert("답을 입력하시오");
      return;
    }
    if (!code) {
      alert("고유 코드를 입력하세요");
      return;
    }
    if (checkboxList.length < 2) {
      alert("답 개수가 2개 이하입니다.");
      return;
    }

    let isAnswer = false;
    let isValue = true;
    let answer = [];
    checkboxList.forEach((checkBoxState) => {
      if (checkBoxState.answer) {
        isAnswer = true;
        answer.push(parseInt(checkBoxState.index) + 1 + "");
      }
      if (!checkBoxState.value) isValue = false;
    });
    if (!isAnswer) {
      alert("답 하나 이상 선택하세요");
      return;
    }
    if (!isValue) {
      alert("내용이 없는 답이 있습니다.");
      return;
    }

    setEditorDataList((prevDataList) =>
      prevDataList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            question,
            code: { ...code, answer },
            content: checkboxList,
          };
        } else {
          return editorData;
        }
      })
    );
  };

  return (
    <AdminEmailLayout type="checkbox" title="Check Box">
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div className={styles.code}>
            <span>고유코드 :</span>
            <input
              type="text"
              placeholder="고유 코드를 작성해주세요."
              name="key"
              value={code.key.trim()}
              onChange={(e) =>
                setCode({ ...code, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className={styles.question}>
            <span>문제 :</span>
            <input
              type="text"
              placeholder="문제를 입력 하지 않아도 무관합니다."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <span>라디오 추가 :</span>
            <textarea
              value={checkboxInput}
              placeholder="내용을 작성해주세요."
              onChange={(e) => setCheckboxInput(replaceNewline(e.target.value))}
              onKeyPress={onKeyPressAddCheckBox}
            />

            <div className={styles.add} onClick={onHandleCheckboxAdd}>
              추가
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.list}>
            {checkboxList.map((checkbox, index) => {
              return (
                <div className={styles.checkbox} key={index}>
                  <i
                    className={
                      checkbox.answer
                        ? "xi-check-square-o"
                        : "xi-checkbox-blank"
                    }
                    onClick={() => onHandleCheckboxCheck(checkbox.index)}
                  />

                  <textarea
                    type="text"
                    placeholder="내용을 작성해주세요."
                    value={checkbox.value}
                    onChange={(e) => onHandleCheckboxChange(e, checkbox)}
                  />

                  <i
                    className="xi-close-circle"
                    onClick={() => onHandleCheckboxDel(checkbox.index)}
                  />
                </div>
              );
            })}
          </div>
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

export default AdminEmailEditCheckBox;
