import parser from "react-html-parser";
import MemoNav from "../MemoNav/MemoNav";
import SubMemoNav from "../SubMemoNav/SubMemoNav";
import styles from "./MemoDetail.module.scss";

const MemoDetail = ({
  data,
  clickModifyBtn,
  dragHandler,
  setFocus,
  clickNavLeftIcon,
  clickClose,
  clickDeleteBtn,
}) => {
  return (
    <>
      <MemoNav
        icon="xi-angle-left-thin"
        dragHandler={dragHandler}
        setFocus={setFocus}
        clickNavLeftIcon={clickNavLeftIcon}
        clickClose={clickClose}
      />
      <SubMemoNav
        icon="xi-border-color"
        onClick={() => clickModifyBtn(data)}
        clickDelBtn={() => clickDeleteBtn(data.Seq, data.state)}
      />
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.title}>{data.Memo_Title}</div>
          <div className={styles.ctx}>{parser(data.TextMemo_Content)}</div>
        </div>
      </div>
    </>
  );
};

export default MemoDetail;
