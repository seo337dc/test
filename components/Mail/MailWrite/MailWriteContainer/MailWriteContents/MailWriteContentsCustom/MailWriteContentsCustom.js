import moment from "moment";
import { useSelector } from "react-redux";
import { convertNum } from "../../../../../../utils/common/adminFun";
import styles from "./MailWriteContentsCustom.module.scss";

const MailWriteContentsCustom = ({
  setTestDataList,
  contents,
  setAnswer,
  disable,
  to_name,
}) => {
  const { doc, title, subtitle, content, isTop } = contents;
  const { startTime, afterTime } = useSelector((state) => {
    return { startTime: state.time.startTime, afterTime: state.time.afterTime };
  });

  const onHandleInput = (obj, value) => {
    const newContent = content.map((ul) => {
      return ul.map((li) => {
        if (
          obj.verti === li.verti &&
          obj.hori === li.hori &&
          obj.type === "input"
        ) {
          return { ...li, code: { ...obj.code, answer: value } };
        } else {
          return li;
        }
      });
    });

    setTestDataList((prevList) =>
      prevList.map((data) => {
        if (data.id === contents.id) {
          return { ...data, content: newContent };
        } else {
          return data;
        }
      })
    );

    setAnswer((prev) => ({ ...prev, [obj.code.key]: value }));
  };
  return (
    <div className={styles.wrap}>
      {isTop && (
        <>
          <div className={styles.title}>
            <div className={styles.text}>
              <h2>{title}</h2>
            </div>
          </div>

          <div className={styles.doc}>
            <div className={styles.odd}>
              <span>문서번호</span>
            </div>
            <div className={styles.even}>
              <span>{doc.docNum}</span>
            </div>
            <div className={styles.odd}>
              <span>작성자</span>
            </div>
            <div className={styles.even}>
              {/* <span>{doc.docWriter}</span> */}
              <span>{to_name}</span>
            </div>
            <div className={styles.odd}>
              <span>작성일자</span>
            </div>
            <div className={styles.last}>
              {/* {docWritedate} */}
              {moment(startTime).add(afterTime, "s").format("YYYY-MM-DD")}
            </div>
          </div>

          <div className={styles.subtitle}>
            <span>{subtitle}</span>
          </div>
        </>
      )}

      <div className={styles.table}>
        {content.map((table, index) => {
          return (
            <ul className={styles.main} key={index}>
              {table.map((obj, index) => {
                if (!obj.type) return <li key={index} />;

                if (obj.type === "head")
                  return (
                    <li className={styles.head} key={index}>
                      <span>{obj.value}</span>
                    </li>
                  );

                if (obj.type === "text")
                  return <li key={index}>{obj.value}</li>;

                if (obj.type === "input")
                  return (
                    <li className={styles.input} key={index}>
                      <input
                        type="text"
                        placeholder={obj.isNum ? "숫자만 입력" : "글자만 입력"}
                        value={obj.code.answer}
                        disabled={disable}
                        onChange={(e) =>
                          obj.isNum
                            ? onHandleInput(obj, convertNum(e.target.value))
                            : onHandleInput(obj, e.target.value)
                        }
                      />
                    </li>
                  );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default MailWriteContentsCustom;
