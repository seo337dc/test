import BookMark from "../../../SVGIcons/BookMark";
import styles from "./DocsHomeCardList.module.scss";

const DocsHomeCardList = ({ data, clickDetail, onClickBookMarkWrap }) => {
  return (
    <>
      {data?.map((d, idx) => (
        <div
          className={styles.wrap}
          key={`file_list_card_${idx}`}
          onClick={() => clickDetail(d.list_name, d.list_no)}
        >
          <div className={styles.container}>
            <div className={styles.info}>
              {d.list_kind}
              <BookMark
                marked={d.file_favorites}
                onClick={(e) =>
                  onClickBookMarkWrap(
                    e,
                    d.list_no,
                    d.file_favorites,
                    d.list_category
                  )
                }
              />
            </div>
            <div className={styles.title}>{d.list_name}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DocsHomeCardList;
