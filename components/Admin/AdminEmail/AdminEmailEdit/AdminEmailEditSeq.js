import { useEffect, useMemo, useState } from "react";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import styles from "./AdminEmailEditSeq.module.scss";

const AdminEmailEditSeq = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
  Intern_Quest_ID,
}) => {
  const [code, setCode] = useState({ key: Intern_Quest_ID + "_", answer: "" });

  const [count, setCount] = useState(0);

  const [numList, setNumList] = useState([]);

  const [seqList, setSeqList] = useState([]);

  useEffect(() => {
    if (!data.content) return;
    const { code } = data;
    const { numList, seqList, count } = data.content;

    if (code) setCode(code);
    if (count) setCount(count);
    if (numList) setNumList(numList);
    if (seqList) setSeqList(seqList);
  }, [data]);

  const checkNextNum = (numList) => {
    let max = Math.max.apply(null, numList);

    return max + 1;
  };

  const nextNum = useMemo(() => checkNextNum(numList), [numList]);

  const onKeyPressAddList = (e) => {
    if (e.key === "Enter") {
      onHandleAddList();
      e.preventDefault();
    }
  };

  const onHandleAddList = () => {
    if (count <= 0) {
      alert("0보다 큰 수를 입력하시오.");
      return;
    }

    let newSeqList = [];
    let newNumList = [];
    for (let i = 1; i <= count; i++) {
      newSeqList.push({ id: i, seq: "", head: "", content: "" });
      newNumList.push(0);
    }

    setNumList(newNumList);
    setSeqList(newSeqList);
  };

  const onHandleChangeCheckBox = (id) => {
    let nowNum = numList[id - 1];

    let newNumList = numList.slice();

    for (let i = 0; i < newNumList.length; i++) {
      if (i === id - 1 && !newNumList[i]) {
        newNumList[i] = nextNum;
      } else if (i === id - 1 && newNumList[i]) {
        for (let j = 0; j < newNumList.length; j++) {
          if (newNumList[j] > nowNum) {
            newNumList[j] = newNumList[j] - 1;
          }
        }
        newNumList[i] = 0;
      }
    }

    setNumList(newNumList);
  };

  const onHandleInput = (e, id) => {
    let test = seqList.map((seq) => {
      if (seq.id === id) {
        return { ...seq, [e.target.name]: e.target.value };
      } else {
        return seq;
      }
    });

    setSeqList(test);
  };

  const onHandleEditConfirm = () => {
    if (!code.key) {
      alert("고유 코드를 입력해주세요");
      return;
    }

    if (count <= 0) {
      alert("체크 박스는 추가해주세요.");
      return;
    }

    for (let i = 0; i < numList.length; i++) {
      if (numList[i] <= 0) {
        alert("선택 되지 않은 체크박스가 있으니 다시 확인을 해주세요.");
        return;
      }
    }

    setEditorDataList((prevDataList) =>
      prevDataList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            code: { ...code, answer: numList },
            content: {
              seqList,
              numList,
              count,
            },
          };
        } else {
          return editorData;
        }
      })
    );
  };

  return (
    <AdminEmailLayout type="sequence" title="Check Box (순서)">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div className={styles.ctn}>
            <span>문제 개수를 입력 하시오 :</span>
            <input
              className={styles.count}
              name="head"
              type="number"
              value={count}
              placeholder="개수"
              onChange={(e) => {
                setCount(e.target.value);
              }}
              onKeyPress={onKeyPressAddList}
            />
            <i className="xi-plus-circle" onClick={onHandleAddList} />
          </div>
          <div className={styles.btn}>
            고유 코드 :
            <input
              className={styles.count}
              type="text"
              placeholder="고유 코드를 작성해주세요."
              name="key"
              value={code.key.trim()}
              placeholder="고유코드"
              onChange={(e) => {
                setCode({ ...code, key: e.target.value });
              }}
            />
            <span onClick={onHandleEditConfirm}>확인</span>
            <span onClick={() => onHandleEditDelete(data)}>삭제</span>
          </div>
        </div>

        <div className={styles.body}>
          {seqList.map((seq, index) => (
            <div className={styles.ctn} key={`seq_${index}`}>
              <div
                className={
                  styles[numList[index] ? "checkbox_on" : "checkbox_off"]
                }
                onClick={() => onHandleChangeCheckBox(seq.id)}
              >
                {numList[index] > 0 && numList[index]}
              </div>
              <input
                className={styles.check_head}
                name="head"
                value={seq.head}
                placeholder="말머리"
                onChange={(e) => onHandleInput(e, seq.id)}
              />
              <input
                className={styles.check_content}
                name="content"
                value={seq.content}
                placeholder="내용 입력"
                onChange={(e) => onHandleInput(e, seq.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </AdminEmailLayout>
  );
};

export default AdminEmailEditSeq;
