import { useState } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import axios from "axios";
import { DELETE_MEMO } from "../../utils/fetch/apiConfig";
import { deleteMemo } from "../../utils/store/actions/memoActions";
import { setIsMemoOpen } from "../../utils/store/actions/modalStateAction";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";
import useModalDrag from "../../utils/customHook/useModalDrag";
import MemoList from "./MemoList/MemoList";
import MemoDetail from "./MemoDetail/MemoDetail";
import styles from "./Memo.module.scss";

const MemoWrite = dynamic(() => import("./MemoWrite/MemoWrite"), {
  ssr: false,
});

const allInitail = { type: "all" };

const writeInitail = { type: "write", state: "new" }; //state: new, modify

const detailInitail = { type: "detail" };

const Memo = () => {
  const dispatch = useDispatch();
  const [memoState, setMemoState] = useState(allInitail);
  const [position, dragHandler, setFocus, options] = useModalDrag(
    50,
    480,
    "memo"
  );
  const [isDelModalOpen, setDelModalOpen] = useState(false);

  const clickModifyBtn = (memoInfo) => {
    setMemoState({ ...memoInfo, ...writeInitail, state: "modify" });
  };

  const clickListItem = (memoInfo) => {
    setMemoState({ ...memoInfo, ...writeInitail, state: "modify" });
    // setMemoState({ ...memoInfo, ...detailInitail });
  };

  const clickClose = () => {
    dispatch(setIsMemoOpen(false));
  };

  const delItem = async () => {
    if (!isDelModalOpen.Seq) {
      setMemoState(allInitail);
      setDelModalOpen(false);
    } else {
      try {
        await axios.post(DELETE_MEMO, { Seq: isDelModalOpen.Seq });

        setDelModalOpen(false);

        if (isDelModalOpen.type === allInitail.type) {
          dispatch(deleteMemo(isDelModalOpen.Seq));
          setDelModalOpen(false);
        } else {
          dispatch(deleteMemo(isDelModalOpen.Seq));
          setMemoState(allInitail);
          setDelModalOpen(false);
        }
      } catch (error) {
        setDelModalOpen(false);
        console.error(error);
      }
    }
  };

  const clickDeleteBtn = async (Seq, type) => {
    setDelModalOpen({ Seq, type });
  };

  return (
    <div
      className={styles.wrap}
      style={{
        right: position,
        zIndex: options.zIndex,
      }}
      onMouseDown={setFocus}
    >
      {(() => {
        if (memoState.type === allInitail.type) {
          return (
            <MemoList
              clickListItem={clickListItem}
              dragHandler={dragHandler}
              setFocus={setFocus}
              clickNavLeftIcon={() => setMemoState(writeInitail)}
              clickClose={clickClose}
              clickDeleteBtn={clickDeleteBtn}
            />
          );
        } else if (memoState.type === writeInitail.type) {
          return (
            <MemoWrite
              data={memoState}
              dragHandler={dragHandler}
              setFocus={setFocus}
              clickClose={clickClose}
              memoState={memoState}
              setMemoState={setMemoState}
              allInitail={allInitail}
              clickDeleteBtn={clickDeleteBtn}
            />
          );
        } else if (memoState.type === detailInitail.type) {
          return (
            <MemoDetail
              data={memoState}
              clickModifyBtn={clickModifyBtn}
              dragHandler={dragHandler}
              setFocus={setFocus}
              clickNavLeftIcon={() => setMemoState(allInitail)}
              clickClose={clickClose}
              clickDeleteBtn={clickDeleteBtn}
            />
          );
        }
      })()}
      {isDelModalOpen && (
        <ConfirmModal
          setModalOpen={setDelModalOpen}
          yesText="삭제"
          yesStyle={{
            border: "1px solid #DA291C",
            color: "#ffffff",
            backgroundColor: "#DA291C",
          }}
          noText="취소"
          noStyle={{
            border: "1px solid #ACACAC",
            color: "#ACACAC",
            backgroundColor: "#ffffff",
          }}
          onYesClick={delItem}
          onNoClick={() => setDelModalOpen(false)}
        >
          <div className={styles.del_wrap}>
            <img src="/img/memo_modal_trash.svg" alt="trash" />
            메모를 삭제하시겠습니까?
          </div>
        </ConfirmModal>
      )}
    </div>
  );
};

export default Memo;
