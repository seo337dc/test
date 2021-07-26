import { useEffect, useState } from "react";
import styles from "./AdminEmailView.module.scss";
import parser from "react-html-parser";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import AdminEmailViewReply from "./AdminEmailViewReply/AdminEmailViewReply";

const AdminEmailView = ({
  editorDataList,
  editorState,
  replyCC,
  replyAttach,
  replyCCHide,
}) => {
  useEffect(() => {
    setIsOrigin(true);
  }, [editorState]);

  useEffect(() => {
    setIsOrigin(false);
  }, [editorDataList]);

  const [isOrigin, setIsOrigin] = useState(true);
  return (
    <div className={styles.view}>
      <div className={styles.tab}>
        <div
          className={isOrigin ? styles.origin_on : styles.origin_off}
          onClick={() => setIsOrigin(true)}
        >
          원본
        </div>
        <div
          className={isOrigin ? styles.reply_off : styles.reply_on}
          onClick={() => setIsOrigin(false)}
        >
          회신
        </div>
      </div>

      {isOrigin && (
        <div className={styles.view}>
          {parser(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
        </div>
      )}

      {!isOrigin && (
        <AdminEmailViewReply
          editorDataList={editorDataList}
          replyCC={replyCC}
          replyAttach={replyAttach}
          replyCCHide={replyCCHide}
        />
      )}
    </div>
  );
};

export default AdminEmailView;
