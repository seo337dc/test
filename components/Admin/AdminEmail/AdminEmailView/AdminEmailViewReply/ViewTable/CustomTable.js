import styles from "./CustomTable.module.scss";

const CustomTable = ({ editData }) => {
  const { doc, title, subtitle, content, isTop } = editData;
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
              <span>{`응시자`}</span>
            </div>
            <div className={styles.odd}>
              <span>작성일자</span>
            </div>
            <div className={styles.last}>{`검사 날짜`}</div>
          </div>

          <div className={styles.subtitle}>
            <span>{subtitle}</span>
          </div>
        </>
      )}

      <div className={styles.table}>
        {content.map((table, t_index) => {
          return (
            <ul className={styles.main} key={t_index}>
              {table.map((obj, obj_index) => {
                if (!obj.type) return <li key={obj_index} />;

                if (obj.type === "head")
                  return (
                    <li className={styles.head} key={obj_index}>
                      <span>{obj.value}</span>
                    </li>
                  );

                if (obj.type === "text")
                  return <li key={obj_index}>{obj.value}</li>;

                if (obj.type === "input")
                  return (
                    <li className={styles.input} key={obj_index}>
                      <input
                        type="text"
                        placeholder="응지사가 입력"
                        value={obj.code.answer}
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

export default CustomTable;
