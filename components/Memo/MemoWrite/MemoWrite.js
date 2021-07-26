import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { CREATE_NEW_MEMO, MODIFY_MEMO } from "../../../utils/fetch/apiConfig";
import MemoNav from "../MemoNav/MemoNav";
import styles from "./MemoWrite.module.scss";

const MemoWrite = ({
  data,
  dragHandler,
  setFocus,
  clickClose,
  setMemoState,
  allInitail,
}) => {
  const isLoading = useRef(false);
  const container = useRef();

  const [title, setTitle] = useState(data.Memo_Title ? data.Memo_Title : "");
  const [editData, setEditData] = useState("");
  const preventCopyPaste = (e) => e.preventDefault();

  useEffect(() => {
    setEditData(data.TextMemo_Content || "");
  }, []);

  useEffect(() => {
    document.addEventListener("copy", preventCopyPaste, true);
    document.addEventListener("paste", preventCopyPaste, true);
    document.addEventListener("cut", preventCopyPaste, true);

    window.document.oncontextmenu = () => {
      return false;
    };

    return () => {
      document.removeEventListener("copy", preventCopyPaste);
      document.removeEventListener("paste", preventCopyPaste);
      document.removeEventListener("cut", preventCopyPaste);
    };
  }, [container.current]);

  const clickNavLeftIcon = async () => {
    if (isLoading.current) {
      return;
    }

    try {
      isLoading.current = true;

      const isNew = data.state === "new";

      await axios.post(isNew ? CREATE_NEW_MEMO : MODIFY_MEMO, {
        Seq: isNew ? null : data.Seq,
        memoTitle: title ? title : "새 메모",
        textMemoContent: editData,
        imageMemoContent: "",
      });

      setMemoState(allInitail);
    } catch (error) {
      isLoading.current = false;

      console.error(error);
    }
  };

  return (
    <>
      <MemoNav
        icon="xi-angle-left-thin"
        dragHandler={dragHandler}
        setFocus={setFocus}
        clickNavLeftIcon={clickNavLeftIcon}
        clickClose={() => {
          clickNavLeftIcon();
          clickClose();
        }}
      />
      <div className={styles.editor_wrap}>
        <input
          className={styles.title_input}
          placeholder="제목을 작성해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div
          style={{
            height: "calc(100% - 60px)",
            backgroundColor: "white",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            overflow: "hidden",
          }}
        >
          <ReactQuill
            style={{ height: "100%", backgroundColor: "white" }}
            modules={{
              toolbar: [["bold", "italic", "underline"]],
            }}
            placeholder="내용을 작성해주세요."
            value={editData || ""}
            onChange={(content, delta, source, editor) =>
              setEditData(editor.getHTML())
            }
          />
        </div>
      </div>
    </>
  );
};

export default MemoWrite;
