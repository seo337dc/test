import styles from "./MemoListItem.module.scss";

const MemoListItem = ({ data, onClick, clickDeleteBtn }) => {
  return (
    <div className={styles.wrap} onClick={() => onClick(data)}>
      <div className={styles.title}>{data.Memo_Title}</div>
      <img
        src="/img/memo_trash.svg"
        alt="trash"
        onClick={(e) => {
          e.stopPropagation();
          clickDeleteBtn(data.Seq, "all");
        }}
        className={styles.trash}
      />
    </div>
  );
};

export default MemoListItem;
