import { useState } from "react";
import { INSERT_QUESTION } from "../../../../utils/fetch/apiConfig";
import axios from "axios";
import styles from "./AdminCopy.module.scss";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import {
  convertCodeList,
  convertCodeListWithReply,
} from "../../../../utils/common/adminFun";

const AdminCopy = ({
  nowInternQuestID,
  nowIssueID,
  cfg,
  setIsCopy,
  copyData,
}) => {
  const [newIssueId, setNewIssueId] = useState("");
  const [newQuestId, setNewQuestId] = useState("");

  const onHandleSubmit = async () => {
    if (newQuestId === "" || newQuestId === nowInternQuestID) {
      alert("새로운 자료코드를 넣으세요");
      return;
    }

    if (newIssueId === "" || newIssueId === nowIssueID) {
      alert("새로운 이슈코드를 넣으세요");
      return;
    }

    let res;

    switch (cfg) {
      case "email":
        const {
          metaInfo,
          editorDataList,
          replyCC,
          replyAttach,
          replyCCHide,
          emailEditorState,
        } = copyData;

        const {
          Mail_Subject,
          From_Name,
          CC_Name,
          Category_CD,
          Attach_Info,
        } = metaInfo;

        let replyData = [];
        const sEdit = draftToHtml(
          convertToRaw(emailEditorState.getCurrentContent())
        );
        let answerList = [];

        if (Category_CD === "6") {
          if (replyCC.isAble) {
            if (!replyCC.CC_Name_Code) {
              alert("RE 참조의 코드를 입력하지 않았습니다.");
              return;
            }
            replyData.push(replyCC);
          }

          if (replyCCHide.isAble) {
            replyData.push(replyCCHide);
          }

          if (replyAttach.isAble) {
            replyData.push(replyAttach);
          }

          answerList = convertCodeListWithReply(
            editorDataList,
            replyCC,
            replyAttach,
            replyCCHide
          );
        } else {
          answerList = convertCodeList(editorDataList);
        }

        editorDataList.forEach((content) => {
          replyData.push(content);
        });

        res = await axios.post(INSERT_QUESTION, {
          App_Name: "email",
          Issue_ID: newIssueId,
          Intern_Quest_ID: newQuestId,
          Category_CD,
          From_Name,
          CC_Name,
          Mail_Subject: "[복사]" + Mail_Subject,
          Mail_Contents: sEdit,
          Re_Mail_Contents: JSON.stringify(replyData),
          Attach_File: Attach_Info.length > 0 ? "Y" : "N",
          answerList,
        });

        if (res.status === 200) {
          alert("복사 성공");
          setIsCopy(false);
        } else {
          alert("복사 실패");
        }
        break;

      case "document":
        const { inputState, docEditorState } = copyData;
        const docData = draftToHtml(
          convertToRaw(docEditorState.getCurrentContent())
        ).replace(/\'/g, "");

        res = await axios.post(INSERT_QUESTION, {
          App_Name: "document",
          Issue_ID: newIssueId,
          Intern_Quest_ID: newQuestId,
          Category_CD: inputState.qSet,
          Mail_CD: inputState.mail,
          File_Kind: inputState.typeDoc,
          File_Name: "[복사]" + inputState.title,
          File_Contents: docData,
        });

        if (res.status === 200) {
          alert("복사 성공");
          setIsCopy(false);
        } else {
          alert("복사 실패");
        }
        break;

      default:
        break;
    }
  };
  return (
    <div className={styles.wrap}>
      <p className={styles.now}>현재 이슈코드 : {nowIssueID}</p>
      <p className={styles.now}>현재 자료코드 : {nowInternQuestID}</p>

      <div className={styles.issue}>
        이슈 코드 입력:
        <input
          value={newIssueId}
          placeholder="새로운 이슈코드를 입력하세요."
          onChange={(e) => setNewIssueId(e.target.value)}
        />
      </div>

      <div className={styles.intern}>
        자료 코드 입력:
        <input
          value={newQuestId}
          placeholder="새로운 자료코드를 입력하세요."
          onChange={(e) => setNewQuestId(e.target.value)}
        />
        <div className={styles.submit} onClick={onHandleSubmit}>
          확인
        </div>
        <div className={styles.submit} onClick={() => setIsCopy(false)}>
          취소
        </div>
      </div>
    </div>
  );
};

export default AdminCopy;
