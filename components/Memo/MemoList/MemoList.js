import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMemoList } from "../../../utils/store/actions/memoActions";
import MemoNav from "../MemoNav/MemoNav";
import MemoListItem from "../MemoListItem/MemoListItem";
import Scrollbar from "react-scrollbars-custom";
import styles from "./MemoList.module.scss";

const MemoList = ({
  clickListItem,
  dragHandler,
  setFocus,
  clickNavLeftIcon,
  clickClose,
  clickDeleteBtn,
}) => {
  const dispatch = useDispatch();
  const memoList = useSelector((state) => state.memoList.sData);
  const [searchInput, setSearchInput] = useState("");

  const clickSearch = (e) => {
    e.preventDefault();
    setSearchInput("");
  };

  useEffect(() => {
    dispatch(getMemoList());
  }, []);

  return (
    <>
      <MemoNav
        icon="xi-plus-thin"
        dragHandler={dragHandler}
        setFocus={setFocus}
        clickNavLeftIcon={clickNavLeftIcon}
        clickClose={clickClose}
      />
      <div className={styles.search_wrap}>
        <form className={styles.search_container} onSubmit={clickSearch}>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="검색명을 입력해주세요."
          />
          <i className="xi-search" />
        </form>
      </div>
      <div className={styles.container}>
        <Scrollbar
          noDefaultStyles
          disableTracksWidthCompensation
          trackYProps={{ style: { right: -14 } }}
        >
          {memoList.length === 0 ? (
            <div className={styles.none}>
              메모를 만들려면
              <br />
              상단의 + 버튼을 클릭하세요.
            </div>
          ) : (
            memoList
              ?.filter((filterData) =>
                searchInput === ""
                  ? true
                  : filterData.Memo_Title.includes(searchInput)
              )
              .map((data, idx) => (
                <MemoListItem
                  key={`memo_list_all_${idx}`}
                  data={data}
                  onClick={clickListItem}
                  clickDeleteBtn={clickDeleteBtn}
                />
              ))
          )}
        </Scrollbar>
      </div>
    </>
  );
};

export default MemoList;
