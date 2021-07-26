import { useEffect, useState } from "react";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import AdminCustomTableModal from "./AdminTableUtil/AdminCustomTableModal";
import styles from "./AdminCustomTable.module.scss";

const AdminCustomTable = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
  Intern_Quest_ID,
}) => {
  const [title, setTitle] = useState("");
  const [doc, setDoc] = useState({
    docNum: "",
    docWriter: "",
    docWriterDate: "",
  });

  const [subtitle, setSubtitle] = useState("");

  const [tableArr, setTableArr] = useState([]);

  const [isModal, setIsModal] = useState(false);

  const [tableObj, setTableObj] = useState({});

  const [isTableTop, setIsTableTop] = useState(true);
  const [tableSize, setTableSize] = useState({ hori: 0, verti: 0 });
  const [isNum, setIsNum] = useState(false);

  useEffect(() => {
    if (!isModal) {
      setTableObj({});
    }
  }, [isModal]);

  useEffect(() => {
    const { content, doc, title, subtitle, isTop } = data;

    if (content && content.length) {
      setTableArr(content);
      setTableSize({ hori: content.length, verti: content[0].length });
    }
    if (doc) setDoc(doc);
    if (title) setTitle(title);
    if (subtitle) setSubtitle(subtitle);

    setIsTableTop(isTop);
  }, [data]);

  const onHandleTableSizeSubmit = () => {
    if (tableSize.hori < 1 || tableSize.verti < 1) {
      alert("가로 세로 크기를 입력하세요.");
      return;
    }

    let testArr = [];
    for (let j = 0; j < tableSize.verti; j++) {
      testArr.push([]);
      for (let i = 0; i < tableSize.hori; i++) {
        testArr[j].push({ verti: j, hori: i });
      }
    }

    setTableArr(testArr);
  };

  const onHandleTableLi = (obj) => {
    setIsModal(true);
    setTableObj(obj);
  };

  const onHandleEditConfirm = () => {
    if (isTableTop) {
      if (!doc.docNum) {
        alert("문서번호를 입력하시오.");
        return;
      }

      if (!subtitle || !title) {
        if (!confirm("제목 또는 부제목이 없습니다. 그래도 진행하시겠습니까"))
          return;
      }
    }

    if (!tableArr.length) {
      alert("테이블이 없습니다.");
      return;
    }

    setEditorDataList((prevDataList) =>
      prevDataList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            content: tableArr,
            title,
            subtitle,
            doc,
            isTop: isTableTop,
          };
        } else {
          return editorData;
        }
      })
    );
  };

  return (
    <AdminEmailLayout title="표(테이블)">
      <div className={styles.wrap}>
        {isModal && (
          <AdminCustomTableModal
            tableObj={tableObj}
            setIsModal={setIsModal}
            setTableArr={setTableArr}
            isNum={isNum}
            setIsNum={setIsNum}
            Intern_Quest_ID={Intern_Quest_ID}
          />
        )}

        <div className={styles.menu}>
          <div className={styles.main}>
            <span>가로 :</span>
            <input
              type="number"
              name="hori"
              value={tableSize.hori}
              onChange={(e) =>
                setTableSize({
                  ...tableSize,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <span>세로 :</span>
            <input
              type="number"
              name="verti"
              value={tableSize.verti}
              onChange={(e) =>
                setTableSize({
                  ...tableSize,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <div className={styles.btn} onClick={onHandleTableSizeSubmit}>
              추가
            </div>
            <div
              className={isTableTop ? styles.btn_on : styles.btn}
              onClick={() => setIsTableTop(!isTableTop)}
            >
              상단
            </div>
          </div>
        </div>

        <div className={styles.title}>
          {isTableTop && (
            <div className={styles.text}>
              <input
                type="text"
                placeholder="표 제목 입력하시오."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          )}
          <div className={styles.btn} onClick={onHandleEditConfirm}>
            확인
          </div>
          <div className={styles.btn} onClick={() => onHandleEditDelete(data)}>
            삭제
          </div>
        </div>

        {isTableTop && (
          <div className={styles.doc}>
            <div className={styles.odd}>
              <span>문서번호</span>
            </div>
            <div className={styles.even}>
              <input
                type="text"
                placeholder="팀명 - 회의 번호 입력"
                name="docNum"
                value={doc.docNum}
                onChange={(e) =>
                  setDoc({ ...doc, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className={styles.odd}>
              <span>작성자</span>
            </div>
            <div className={styles.even}>
              <input
                type="text"
                placeholder="작성자 입력"
                name="docWriter"
                value="응시자"
                disabled={true}
              />
            </div>
            <div className={styles.odd}>
              <span>작성일자</span>
            </div>
            <div className={styles.last}>
              <input
                name="docWriterDate"
                placeholder="작성 일자 입력"
                value={`검사 날짜`}
                disabled={true}
              />
            </div>
          </div>
        )}

        {isTableTop && (
          <div className={styles.subtitle}>
            <input
              type="text"
              placeholder="부제목 입력하시오."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
        )}

        <div className={styles.container}>
          <div className={styles.table}>
            {tableArr.map((table, index) => {
              return (
                <ul key={index} className={styles.main}>
                  {table.map((obj, index) => {
                    if (!obj.type)
                      return (
                        <li key={index} onClick={() => onHandleTableLi(obj)} />
                      );

                    if (obj.type === "head") {
                      return (
                        <li
                          key={index}
                          className={styles.head}
                          onClick={() => onHandleTableLi(obj)}
                        >
                          <span>{obj.value}</span>
                        </li>
                      );
                    }

                    if (obj.type === "text")
                      return (
                        <li key={index} onClick={() => onHandleTableLi(obj)}>
                          {obj.value}
                        </li>
                      );

                    if (obj.type === "input")
                      return (
                        <li
                          key={index}
                          className={styles.input}
                          onClick={() => onHandleTableLi(obj)}
                        >
                          <span className={styles.answer}>
                            {obj.code.answer}
                          </span>
                          <span
                            className={styles.key}
                          >{`(${obj.code.key})`}</span>
                        </li>
                      );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </AdminEmailLayout>
  );
};

export default AdminCustomTable;
