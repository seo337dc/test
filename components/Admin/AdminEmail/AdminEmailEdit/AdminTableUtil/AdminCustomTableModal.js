import { useState } from "react";
import { convertNum } from "../../../../../utils/common/adminFun";
import styles from "./AdminCustomTableModal.module.scss";

const AdminCustomTableModal = ({
  tableObj,
  setIsModal,
  setTableArr,
  isNum,
  setIsNum,
  Intern_Quest_ID,
}) => {
  const [isHead, setIsHead] = useState(false);
  const [isText, setIsText] = useState(true);
  const [isInput, setIsInput] = useState(false);

  const [headState, setHeadState] = useState("");
  const [textState, setTextState] = useState("");
  const [code, setCode] = useState(Intern_Quest_ID + "_");
  const [inputState, setInputState] = useState("");

  const onHandleIsCheck = (type) => {
    if (type === "head") {
      setIsHead(true);
      setIsText(false);
      setIsInput(false);
    }

    if (type === "text") {
      setIsHead(false);
      setIsText(true);
      setIsInput(false);
    }

    if (type === "input") {
      setIsHead(false);
      setIsText(false);
      setIsInput(true);
    }
  };

  const onHandleSubmit = (type) => {
    let newObj = {};

    switch (type) {
      case "head":
        if (!headState) {
          alert("Head 내용을 입력하지 않았습니다.");
          return;
        }
        newObj = { ...tableObj, type, value: headState };
        break;

      case "text":
        if (!textState) {
          alert("Text 내용을 입력하지 않았습니다.");
          return;
        }
        newObj = { ...tableObj, type, value: textState };
        break;

      case "input":
        if (!inputState || !code) {
          alert("고유 코드 혹은 내용을 입력하지 않아습니다.");
          return;
        }
        newObj = {
          ...tableObj,
          type,
          isNum,
          code: { key: code, answer: inputState },
        };
        break;

      default:
        break;
    }

    setTableArr((preArr) =>
      preArr.map((table) => {
        return table.map((obj) => {
          if (tableObj.hori === obj.hori && tableObj.verti === obj.verti) {
            return newObj;
          } else {
            return obj;
          }
        });
      })
    );

    setIsNum(false);
    setIsModal(false);
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <i
          className="xi-close-min"
          onClick={() => {
            setIsModal(false);
          }}
        />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.tool}>
          <label>
            <input
              type="checkbox"
              checked={isHead}
              onChange={() => {}}
              onClick={() => {
                onHandleIsCheck("head");
              }}
            />
            Head
          </label>
        </div>

        <div className={styles.tool}>
          <label>
            <input
              type="checkbox"
              checked={isText}
              onChange={() => {}}
              onClick={() => {
                onHandleIsCheck("text");
              }}
            />
            Text
          </label>
        </div>
        <div className={styles.tool}>
          <label>
            <input
              type="checkbox"
              checked={isInput}
              onChange={() => {}}
              onClick={() => {
                onHandleIsCheck("input");
              }}
            />
            Input
          </label>
        </div>
      </div>

      {isHead && (
        <div className={styles.head}>
          <p>입력 :</p>
          <input
            type="text"
            placeholder="Head 내용 입력"
            value={headState}
            onChange={(e) => {
              setHeadState(e.target.value);
            }}
          />

          <div className={styles.submit} onClick={() => onHandleSubmit("head")}>
            확인
          </div>
        </div>
      )}

      {isText && (
        <div className={styles.text}>
          <p>입력 :</p>
          <input
            type="text"
            placeholder="text 내용 입력"
            value={textState}
            onChange={(e) => {
              setTextState(e.target.value);
            }}
          />

          <div className={styles.submit} onClick={() => onHandleSubmit("text")}>
            확인
          </div>
        </div>
      )}

      {isInput && (
        <div className={styles.input}>
          <div className={styles.code}>
            <span>고유 코드 :</span>
            <input
              type="text"
              placeholder="고유코드 입력"
              value={code.trim()}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>
          <div className={styles.main}>
            <span>내용 입력 :</span>
            <input
              type="text"
              placeholder="input 내용 입력"
              value={inputState}
              onChange={(e) => {
                isNum
                  ? setInputState(convertNum(e.target.value))
                  : setInputState(e.target.value);
              }}
            />

            <i
              className={isNum ? "xi-check-square-o" : "xi-checkbox-blank"}
              onClick={() => setIsNum(!isNum)}
            />
            <span>숫자</span>

            <div
              className={styles.submit}
              onClick={() => onHandleSubmit("input")}
            >
              확인
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomTableModal;
