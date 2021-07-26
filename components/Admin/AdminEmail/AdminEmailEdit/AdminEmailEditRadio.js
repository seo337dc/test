import { useEffect, useState } from "react";
import { replaceNewline } from "../../../../utils/common/fomatter";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import styles from "./AdminEmailEditRadio.module.scss";

const AdminEmailEditRadio = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
  Intern_Quest_ID,
}) => {
  const [question, setQuestion] = useState("");
  const [radioInput, setRadioInput] = useState("");
  const [radioList, setRadioList] = useState([]);
  const [code, setCode] = useState({ key: Intern_Quest_ID + "", answer: "" });

  useEffect(() => {
    const { code, question, content } = data;
    if (code) setCode(code);
    if (question) setQuestion(question);
    if (content) setRadioList(content);
  }, [data]);

  //라디오 내용 추가 기능
  const onHandleRadioAdd = () => {
    if (!radioInput) {
      alert("내용을 작성해주세요.");
      return;
    }

    const addList = radioList.concat({ value: replaceNewline(radioInput) });

    setRadioList(
      addList.map((radio, index) => {
        return { index: index + "", ...radio };
      })
    );
    setRadioInput("");
  };

  const onKeyPressAddCheckBox = (e) => {
    if (e.key === "Enter") {
      onHandleRadioAdd();
      e.preventDefault();
    }
  };

  //라디오 체크 기능
  const onHandleRadioCheck = (index) => {
    setRadioList(
      radioList.map((radioState) => {
        if (index === radioState.index) {
          return { ...radioState, answer: true };
        } else {
          return { ...radioState, answer: false };
        }
      })
    );
  };

  //라디오 내용 변경 기능
  const onHandleRadioChange = (e, index) => {
    setRadioList(
      radioList.map((radio) => {
        if (index === radio.index) {
          return { ...radio, value: replaceNewline(e.target.value) };
        } else {
          return radio;
        }
      })
    );
  };

  //라디오 리스트 지우는 기능
  const onHandleRadioDel = (index) => {
    const nowstate = radioList.filter(
      (radioState) => radioState.index !== index
    );

    setRadioList(
      nowstate.map((state, index) => {
        return { ...state, index: index + "" };
      })
    );
  };

  //확인 기능
  const onHandleEditConfirm = () => {
    let isAnswer = false;
    let isValue = true;

    if (!radioList.length) {
      alert("내용을 추가해주세요.");
      return;
    }

    if (!code.key) {
      alert("고유 코드를 작성해주세요.");
      return;
    }

    if (radioList.length < 2) {
      alert("내용은 2개 이상이어야합니다.");
      return;
    }

    radioList.forEach((radioState) => {
      if (radioState.answer) isAnswer = true;
      if (!radioState.value) isValue = false;
    });

    if (!isAnswer) {
      alert("답을 선택해주세요.");
      return;
    }

    if (!isValue) {
      alert("내용이 없는 부분이 있습니다.");
      return;
    }

    let answer = "";
    for (let i = 0; i < radioList.length; i++) {
      if (radioList[i].answer) {
        answer = parseInt(radioList[i].index) + 1;
        break;
      }
    }

    setEditorDataList((prevDataList) =>
      prevDataList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            content: radioList,
            question,
            code: { ...code, answer: answer + "" },
          };
        } else {
          return editorData;
        }
      })
    );
  };

  return (
    <AdminEmailLayout type="radio" title="Radio Box">
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div className={styles.code}>
            <span>고유코드 :</span>
            <input
              type="text"
              placeholder="고유 코드를 작성해주세요."
              name="key"
              value={code.key}
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
              value={radioInput}
              placeholder="내용을 작성해주세요."
              onChange={(e) => setRadioInput(replaceNewline(e.target.value))}
              onKeyPress={onKeyPressAddCheckBox}
            />

            <div className={styles.add} onClick={onHandleRadioAdd}>
              추가
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.list}>
            {radioList.map((radio, index) => {
              return (
                <div className={styles.radio} key={index}>
                  <i
                    className={
                      radio.answer ? "xi-radiobox-checked" : "xi-radiobox-blank"
                    }
                    onClick={() => onHandleRadioCheck(radio.index)}
                  />

                  <textarea
                    type="text"
                    placeholder="내용을 작성해주세요."
                    value={radio.value}
                    onChange={(e) => onHandleRadioChange(e, radio.index)}
                  />

                  <i
                    className="xi-close-circle"
                    onClick={() => onHandleRadioDel(radio.index)}
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

export default AdminEmailEditRadio;
