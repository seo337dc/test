import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import axios from "axios";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import AdminEditorNav from "../AdminEditorNav/AdminEditorNav";
import LoadingAdminFullScreen from "../LoadingAdminFullScreen/LoadingAdminFullScreen";
import AdminEmailMeta from "./AdminEmailMeta/AdminEmailMeta";
import AdminEmailReply from "./AdminEmailReply/AdminEmailReply";
import AdminEmailView from "./AdminEmailView/AdminEmailView";
import AdminEmailOrigin from "./AdminEmailOrigin/AdminEmailOrigin";
import AdminCopy from "./AdminCopy/AdminCopy";
import {
  INSERT_QUESTION,
  SELECT_DOCUMENT,
  SELECT_QUESTION,
  UPDATE_QUESTION,
} from "../../../utils/fetch/apiConfig";
import {
  convertCodeList,
  convertCodeListWithReply,
} from "../../../utils/common/adminFun";
import styles from "./AdminEmail.module.scss";

const AdminEmail = () => {
  const router = useRouter();

  const [editorDataList, setEditorDataList] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [metaInfo, setMetaInfo] = useState({
    Mail_Subject: "",
    From_Name: "",
    CC_Name: "",
    Issue_ID: "",
    Intern_Quest_ID: "",
    Category_CD: "7",
    Attach_File: "N",
    Attach_Info: [],
  });

  const [replyCC, setReplyCC] = useState({
    isAble: false,
    type: "replyCC",
    CC_Name: [],
    CC_Name_Code: "",
    isSeq: false,
  });

  const [replyCCHide, setReplyCCHide] = useState({
    isAble: false,
    type: "replyCCHide",
    CC_Name: [],
    CC_Name_Code: "",
    isSeq: false,
  });

  const [replyAttach, setReplyAttach] = useState({
    isAble: false,
    type: "replyAttach",
    Attach_Info: [],
    Attach_Info_Code: "",
    isSeq: false,
  });

  const [isOrigin, setIsOrigin] = useState(true);

  const [isLoading, setLoading] = useState(false);

  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      (async () => {
        try {
          setLoading(true);

          const res = await axios.post(SELECT_QUESTION, {
            App_Name: "email",
            Intern_Quest_ID: router.query.id,
          });

          const {
            Issue_ID,
            Intern_Quest_ID,
            Category_CD,
            From_Name,
            CC_Name,
            Mail_Subject,
            Mail_Contents,
            Re_Mail_Contents,
            Attach_File,
          } = res.data.selectQuestion[0];

          const resDoc = await axios.post(SELECT_DOCUMENT, {
            Mail_CD: Intern_Quest_ID,
          });

          setMetaInfo({
            ...metaInfo,
            Mail_Subject,
            From_Name,
            CC_Name,
            Issue_ID,
            Intern_Quest_ID,
            Category_CD,
            Attach_File,
            Attach_Info: resDoc.data.documentList,
          });

          if (Re_Mail_Contents) {
            let nowContentList = JSON.parse(Re_Mail_Contents);

            let objCC;
            let objHideCC;
            let objAttach;

            let editList = [];

            nowContentList.forEach((content) => {
              if (content.type === "replyCC") {
                objCC = content;
              } else if (content.type === "replyAttach") {
                objAttach = content;
              } else if (content.type === "replyCCHide") {
                objHideCC = content;
              } else {
                editList.push(content);
              }
            });

            setEditorDataList(editList);

            if (objCC) setReplyCC(objCC);
            if (objHideCC) setReplyCCHide(objHideCC);
            if (objAttach) setReplyAttach(objAttach);
          }

          if (Mail_Contents) {
            const { contentBlocks, entityMap } = htmlToDraft(Mail_Contents);

            if (contentBlocks) {
              const contentState = ContentState.createFromBlockArray(
                contentBlocks,
                entityMap
              );

              const convertedState = EditorState.createWithContent(
                contentState
              );

              setEditorState(convertedState);
            } else {
              setEditorState(EditorState.createEmpty());
            }
          }
          // alert(`[${res.data.result}] ${res.data.msg}`);
          setLoading(false);
        } catch (error) {
          alert("문제가 발생했습니다. 새로고침 혹은 문의 바랍니다.");
          console.error(error);
          setLoading(false);
        }
      })();
    }
  }, [router.query.id]);

  const onHandleInputState = (e) => {
    setMetaInfo({ ...metaInfo, [e.target.name]: e.target.value });
  };

  const onHandleFromInfo = (fromInfo) => {
    setMetaInfo(fromInfo);
  };

  const onHandleAttachInfo = (attachFileInfo) => {
    setMetaInfo(attachFileInfo);
  };

  const onHandleCCInfo = (ccInfo) => {
    setMetaInfo(ccInfo);
  };

  const onHandleEditDelete = (data) => {
    if (confirm("정말 삭제를 하시겠습니까?")) {
      const nowState = editorDataList.filter(
        (editorData) => editorData.id !== data.id
      );

      setEditorDataList(
        nowState.map((state, index) => {
          return { ...state, id: index + "" };
        })
      );
    }
  };

  const onHandleSubmit = async () => {
    const {
      Mail_Subject,
      From_Name,
      CC_Name,
      Issue_ID,
      Intern_Quest_ID,
      Category_CD,
      Attach_Info,
    } = metaInfo;

    for (let i = 0; i < editorDataList.length; i++) {
      if (
        editorDataList[i].type !== "br" &&
        editorDataList[i].type !== "blank" &&
        !editorDataList[i].content
      ) {
        alert(
          "미완성된 문항이 있습니다. 완성된 문항의 확인버튼을 클릭해주세요."
        );
        return;
      }
    }

    let sData = [];
    const sEdit = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    let answerList = [];

    if (
      !Mail_Subject ||
      !From_Name ||
      !Issue_ID ||
      !Intern_Quest_ID ||
      !Category_CD
    ) {
      alert("입력하지 않은 정보가 있습니다.");
      return;
    }

    if (Category_CD === "6") {
      if (replyCC.isAble) {
        if (!replyCC.CC_Name_Code) {
          alert("RE 참조의 코드를 입력하지 않았습니다.");
          return;
        }
        sData.push(replyCC);
      }

      if (replyCCHide.isAble) {
        if (!replyCCHide.CC_Name_Code) {
          alert("RE 숨은참조의 코드를 입력하지 않았습니다.");
          return;
        }
        sData.push(replyCCHide);
      }

      if (replyAttach.isAble) {
        if (!replyAttach.Attach_Info_Code) {
          alert("RE 첨부의 고유코드를 입력하지 않았습니다.");
          return;
        }

        sData.push(replyAttach);
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
      sData.push(content);
    });

    if (confirm("추가/수정 하시겠습니까?")) {
      if (isLoading) {
        return;
      }

      try {
        setLoading(true);

        const res = await axios.post(
          !router.query.id ? INSERT_QUESTION : UPDATE_QUESTION,
          {
            App_Name: "email",
            Issue_ID,
            Intern_Quest_ID,
            Category_CD,
            From_Name,
            CC_Name,
            Mail_Subject,
            Mail_Contents: sEdit,
            Re_Mail_Contents: JSON.stringify(sData),
            Attach_File: Attach_Info.length > 0 ? "Y" : "N",
            answerList,
          }
        );
        console.log("[SYSTEM]", res.data);
        setLoading(false);

        if (confirm("메인페이지로 이동하시겠습니까?"))
          router.push("/admin/dashboard?menu=email");
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <AdminEditorNav
          title="이메일"
          onHandleSubmit={onHandleSubmit}
          loc={router.query.id && "email"}
          setIsCopy={setIsCopy}
        />

        {isCopy && (
          <AdminCopy
            copyData={{
              metaInfo,
              editorDataList,
              emailEditorState: editorState,
              replyCC,
              replyCCHide,
              replyCCHide,
              replyAttach,
            }}
            nowInternQuestID={metaInfo.Intern_Quest_ID}
            nowIssueID={metaInfo.Issue_ID}
            cfg="email"
            setIsCopy={setIsCopy}
          />
        )}

        <form className={styles.main}>
          <div className={styles.draw}>
            <AdminEmailMeta
              metaInfo={metaInfo}
              isOrigin={isOrigin}
              setReplyAttach={setReplyAttach}
              setReplyCC={setReplyCC}
              setReplyCCHide={setReplyCCHide}
              onHandleInputState={onHandleInputState}
              onHandleFromInfo={onHandleFromInfo}
              onHandleAttachInfo={onHandleAttachInfo}
              onHandleCCInfo={onHandleCCInfo}
            />

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
              <AdminEmailOrigin
                editorState={editorState}
                setEditorState={setEditorState}
              />
            )}

            {!isOrigin && (
              <AdminEmailReply
                editorDataList={editorDataList}
                setEditorDataList={setEditorDataList}
                replyAttach={replyAttach}
                setReplyAttach={setReplyAttach}
                replyCC={replyCC}
                setReplyCC={setReplyCC}
                replyCCHide={replyCCHide}
                setReplyCCHide={setReplyCCHide}
                metaInfo={metaInfo}
                onHandleEditDelete={onHandleEditDelete}
              />
            )}
          </div>

          <AdminEmailView
            editorDataList={editorDataList}
            onHandleEditDelete={onHandleEditDelete}
            editorState={editorState}
            replyCC={replyCC}
            replyCCHide={replyCCHide}
            replyAttach={replyAttach}
          />
        </form>
      </div>
      {isLoading && <LoadingAdminFullScreen />}
    </div>
  );
};

export default AdminEmail;
