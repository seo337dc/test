import { useMemo } from "react";
import styles from "./MailWriteContentSeqCheck.module.scss";

const MailWriteContentSeqCheck = ({
  id,
  content,
  code,
  disable,
  setTestDataList,
  setAnswer,
}) => {
  const { seqList, numList } = content;

  const checkNextNum = (numList) => {
    let max = Math.max.apply(null, numList);
    return max + 1;
  };

  const nextNum = useMemo(() => checkNextNum(numList), [numList]);

  const onHandleCheckBox = (seqId) => {
    let nowNum = numList[seqId - 1];
    let newNumList = numList.slice();

    for (let i = 0; i < newNumList.length; i++) {
      if (i === seqId - 1 && !newNumList[i]) {
        newNumList[i] = nextNum;
      } else if (i === seqId - 1 && newNumList[i]) {
        for (let j = 0; j < newNumList.length; j++) {
          if (newNumList[j] > nowNum) {
            newNumList[j] = newNumList[j] - 1;
          }
        }
        newNumList[i] = 0;
      }
    }

    setTestDataList((prev) =>
      prev.map((data) => {
        if (id === data.id) {
          return {
            ...data,
            content: {
              ...content,
              numList: newNumList,
            },
            code: { ...data.code, answer: newNumList.join(",") },
          };
        } else {
          return data;
        }
      })
    );

    setAnswer((prev) => {
      return { ...prev, [code.key]: newNumList.join(",") };
    });
  };

  return (
    <div className={styles.seqCheck}>
      {seqList.map((seq, index) => (
        <div className={styles.ctn} key={`seq_${index}`}>
          <div
            className={styles[numList[index] ? "checkbox_on" : "checkbox_off"]}
            onClick={() => (!disable ? onHandleCheckBox(seq.id) : {})}
          >
            <span>{numList[index] > 0 && numList[index]}</span>
          </div>
          <label>{seq.head}</label>
          <label>{seq.content}</label>
        </div>
      ))}
    </div>
  );
};

export default MailWriteContentSeqCheck;
