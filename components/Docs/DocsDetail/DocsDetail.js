import { useEffect, useState } from "react";
import Scrollbar from "react-scrollbars-custom";
import BookMark from "../../SVGIcons/BookMark";
import axios from "axios";
import parser from "react-html-parser";
import { GET_DOC_FILE_DETAIL } from "../../../utils/fetch/apiConfig";
import styles from "./DocsDetail.module.scss";

const DocsDetail = ({ style, id, onClickBookMark }) => {
  const [data, setData] = useState(false);

  const getDetailData = async () => {
    if (id) {
      try {
        const res = await axios.post(GET_DOC_FILE_DETAIL, {
          fileNo: id,
        });
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onClickBookMarkWrap = async () => {
    const result = await onClickBookMark(
      id,
      data.file_favorites,
      data.category
    );
    // getDetailData();

    if (result === "OK") {
      if (data.file_favorites === "Y") {
        setData((prev) => ({ ...prev, file_favorites: "N" }));
      } else {
        setData((prev) => ({ ...prev, file_favorites: "Y" }));
      }
    }
  };

  useEffect(() => {
    getDetailData();
  }, [id]);

  if (!data) {
    return <div />;
  }

  return (
    <div
      className={styles.wrap}
      style={style}
      onCopy={(e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        return false;
      }}
    >
      <div className={styles.nav}>
        <div className={styles.info}>
          {"자료실 홈 > "}
          {data.categoryKOR}
        </div>
      </div>
      <Scrollbar noDefaultStyles disableTracksWidthCompensation>
        <div className={styles.container}>
          <div className={styles.title}>
            {data.file_name}
            <div className={styles.book_mark_wrap}>
              <BookMark
                onClick={onClickBookMarkWrap}
                marked={data.file_favorites}
              />
            </div>
          </div>
          <div className={styles.ctx}>{parser(data.contents)}</div>
        </div>
      </Scrollbar>
    </div>
  );
};

export default DocsDetail;
