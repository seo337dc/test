import BookMark from "../../../SVGIcons/BookMark";
import styles from "./DocsHomeList.module.scss";

const DocsHomeList = ({ data, clickDetail, onClickBookMarkWrap }) => {
  return (
    <>
      {data.map((d, idx) => (
        <div
          className={styles.wrap}
          onClick={() => clickDetail(d.list_name, d.list_no)}
          key={`file_list_${idx}`}
        >
          <div className={styles.book_wrap}>
            <BookMark
              onClick={(e) =>
                onClickBookMarkWrap(
                  e,
                  d.list_no,
                  d.file_favorites,
                  d.list_category
                )
              }
              marked={d.file_favorites}
            />
            {/* <div className={styles.kind}>{d.list_kind}</div> */}
            <div className={styles.kind}>{d.list_categoty}</div>
          </div>
          <div className={styles.title}>{d.list_name}</div>
        </div>
      ))}
    </>
  );
};

export default DocsHomeList;
