import { useState, useEffect } from "react";
import BookMark from "../../SVGIcons/BookMark";
import DocsHomeCardList from "./DocsHomeCardList/DocsHomeCardList";
import DocsHomeList from "./DocsHomeList/DocsHomeList";
import DocsEmptyList from "./DocsEmptyList/DocsEmptyList";
import DocsPWModal from "../DocsPWModal/DocsPWModal";
import Scrollbar from "react-scrollbars-custom";
import axios from "axios";
import { GET_DOC_FILE_LIST_NO } from "../../../utils/fetch/apiConfig";
import styles from "./DocsHome.module.scss";

const initialSelected = {
  Category_CD: 3,
  Category_ENGNM: "Public",
  Category_KORNM: "공용문서함",
  OpenYN: "Y",
};

const DocsHome = ({ style, setTabList, idx, tabDetail, onClickBookMark }) => {
  const [selected, setSelected] = useState(initialSelected); //공용문서함
  const [isCardView, setCardView] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isPWModalOpen, setPWModalOpen] = useState(false);

  const onClickCategory = (data) => {
    setSelected(data);
  };

  const clickDetail = (title, id) => {
    setTabList((prev) => {
      const tempPrev = [...prev];
      tempPrev[idx] = tabDetail(Math.random(), title, id);
      return tempPrev;
    });
  };

  const getFileList = async () => {
    try {
      let res = await axios.post(GET_DOC_FILE_LIST_NO, {
        categoryCD: selected.Category_CD,
      });

      if (selected.Category_CD === 3) {
        res.data.listData = res.data.listData.sort((a, b) => {
          return a.list_categoty < b.list_categoty
            ? -1
            : a.list_categoty > b.list_categoty
            ? 1
            : 0;
        });
      }

      setFileList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickBookMarkWrap = async (e, fileNo, isMarked, categoryCD) => {
    e.stopPropagation();
    await onClickBookMark(fileNo, isMarked, categoryCD);
    getFileList();
  };

  useEffect(() => {
    if (selected.OpenYN === "Y" || !selected.OpenYN) {
      getFileList();
    } else {
      getFileList();
      setPWModalOpen(true);
    }
  }, [selected]);

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
      <div className={styles.menu}>
        <div className={styles.title}>Folders</div>
        {fileList?.categoryList?.map((data, idx) => (
          <div
            className={`${styles.item} ${
              selected.Category_CD === data.Category_CD ? styles.selected : ""
            }`}
            onClick={() => onClickCategory(data)}
            key={`docs_menu_${idx}_${Math.random()}`}
          >
            {(() => {
              if (
                data.Category_CD == 1 ||
                data.Category_CD == 2 ||
                data.Category_CD == 3
              ) {
                return <img src="/img/folder.svg" alt="folder" />;
              } else if (data.OpenYN === "N") {
                return (
                  <img
                    src="/img/category_locked.svg"
                    alt="folder"
                    style={{ filter: "opacity(1)" }}
                  />
                );
              } else if (data.OpenYN === "Y") {
                return (
                  <img
                    src="/img/category_unlocked.svg"
                    alt="folder"
                    style={{ filter: "opacity(1)" }}
                  />
                );
              } else {
                return <img src="/img/folder.svg" alt="folder" />;
              }
            })()}
            {data.Category_KORNM}
          </div>
        ))}
      </div>
      <div className={styles.container}>
        <div className={styles.title}>File List</div>
        <div className={styles.list_wrap}>
          <div className={styles.main_title}>
            <div />
            <div className={styles.text}>
              {
                fileList?.categoryList?.filter(
                  (f) => f.Category_CD == selected.Category_CD
                )[0]?.Category_KORNM
              }
            </div>
            <div className={styles.title_menu_wrap}>
              {/* <img
                src="/img/bars.svg"
                alt="bars"
                className={isCardView ? styles.unSelected : ""}
                onClick={() => setCardView(false)}
              /> */}
              {/* <img
                src="/img/cards.svg"
                alt="cards"
                className={isCardView ? "" : styles.unSelected}
                onClick={() => setCardView(true)}
              /> */}
            </div>
          </div>
          <div className={styles.fav_wrap}>
            <BookMark />
            <div className={styles.text}>즐겨찾기 해제</div>
            <BookMark marked="Y" />
            <div className={styles.text}>즐겨찾기 등록</div>
          </div>
          <div className={styles.list}>
            <Scrollbar noDefaultStyles disableTracksWidthCompensation>
              <div
                className={`${isCardView ? styles.flex : styles.column}`}
                style={{
                  margin:
                    !fileList.listData || fileList.listData.length === 0
                      ? 0
                      : "",
                }}
              >
                {(() => {
                  if (!fileList.listData || fileList.listData.length === 0) {
                    return (
                      <DocsEmptyList
                        categoryCD={selected.Category_CD}
                        OpenYN={selected.OpenYN}
                      />
                    );
                  } else {
                    if (isCardView) {
                      return (
                        <DocsHomeCardList
                          data={fileList.listData}
                          clickDetail={clickDetail}
                          onClickBookMarkWrap={onClickBookMarkWrap}
                        />
                      );
                    } else {
                      return (
                        <DocsHomeList
                          data={fileList.listData}
                          clickDetail={clickDetail}
                          onClickBookMarkWrap={onClickBookMarkWrap}
                        />
                      );
                    }
                  }
                })()}
              </div>
            </Scrollbar>
          </div>
        </div>
      </div>
      {isPWModalOpen && (
        <DocsPWModal
          setModalOpen={setPWModalOpen}
          title={selected.Category_KORNM}
          categoryCD={selected.Category_CD}
          setFileList={setFileList}
        />
      )}
    </div>
  );
};

export default DocsHome;
