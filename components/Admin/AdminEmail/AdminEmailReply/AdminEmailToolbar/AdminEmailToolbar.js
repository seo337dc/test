import styles from "./AdminEmailToolbar.module.scss";

const AdminEmailToolbar = ({ setEditorDataList, setIsCode }) => {
  const onHandleAddList = (type) => {
    setEditorDataList((prevDataList) => {
      if (!prevDataList.length) {
        return prevDataList.concat({
          id: 0 + "",
          type,
        });
      } else {
        return prevDataList.concat({
          id: parseInt(prevDataList[prevDataList.length - 1].id) + 1 + "",
          type,
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("text")}
        title="짧은 글 입력 기능"
      >
        <i className=" xi-caps" />
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("p")}
        title="(한줄 내리고)짧은 글 입력 기능"
      >
        <i className=" xi-park" />
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("textarea")}
        title="긴 글 입력 기능"
      >
        <i className="xi-text-size" />
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("parea")}
        title="(한줄 내리고)긴 글 입력 기능"
      >
        <i className="xi-paragraph" />
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("question")}
        title="문항"
      >
        <span>문항 질문</span>
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("input")}
        title="input 박스 기능"
      >
        <i className="xi-browser-text" />
      </div>
      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("dropbox")}
        title="drop 박스 기능"
      >
        <i className="xi-caret-down" />
      </div>
      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("radio")}
        title="radio 박스 기능"
      >
        <i className="xi-radiobox-checked" />
      </div>
      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("checkbox")}
        title="checkbox 박스 기능"
      >
        <i className="xi-check-square-o" />
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("seqCheck")}
        title="순서 체크박스 기능"
      >
        <span>seq Check</span>
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("image")}
        title="이미지 기능"
      >
        <i className="xi-image" />
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("trip")}
        title="출장 신청서 기능"
      >
        <span>trip</span>
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("meeting")}
        title="회의록 기능"
      >
        <span>meeting</span>
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("table")}
        title="표 만들기 기능"
      >
        <i className="xi-border-all" />
      </div>
      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("br")}
        title="한줄 띄기"
      >
        <i className="xi-arrow-down" />
      </div>

      <div
        className={styles.btn_on}
        onClick={() => onHandleAddList("blank")}
        title="빈칸"
      >
        <span>빈 칸</span>
      </div>

      <div
        className={styles.code}
        onClick={() => {
          setIsCode((preState) => !preState);
        }}
      >
        code result
      </div>
    </div>
  );
};

export default AdminEmailToolbar;
