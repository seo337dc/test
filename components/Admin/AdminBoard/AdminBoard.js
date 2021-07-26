import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import axios from "axios";
import {
  INSERT_QUESTION,
  UPDATE_QUESTION,
  SELECT_QUESTION,
} from "../../../utils/fetch/apiConfig";
import draftToHtml from "draftjs-to-html";
import uploadImageCallBack from "../../../utils/common/uploadFiles";
import htmlToDraft from "html-to-draftjs";
import parser from "react-html-parser";
import AdminEditorNav from "../AdminEditorNav/AdminEditorNav";
import LoadingAdminFullScreen from "../LoadingAdminFullScreen/LoadingAdminFullScreen";
import styles from "./AdminBoard.module.scss";
import AdminCopy from "../AdminEmail/AdminCopy/AdminCopy";

const Board = () => {
  const router = useRouter();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [inputState, setInputState] = useState({
    title: "",
    qSet: "2",
    qCode: "",
    iCode: "",
    typeDoc: "보고서",
    typeGroup: "공통",
    mail: "",
  });
  const [isLoading, setLoading] = useState(false);

  const [isCopy, setIsCopy] = useState(false);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onHandleInputChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async () => {
    if (isLoading) {
      return;
    }

    const { title, qSet, iCode, qCode, typeDoc } = inputState;

    if (!title || !qSet || !iCode || !qCode || !typeDoc) {
      alert("입력하지 않은 정보가 있습니다.");
      return;
    }

    try {
      const sData = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      ).replace(/\'/g, "");

      if (!router.query.id) {
        if (confirm("추가하시겠습니까?")) {
          setLoading(true);
          const res = await axios.post(INSERT_QUESTION, {
            App_Name: "document",
            Issue_ID: inputState.iCode,
            Intern_Quest_ID: inputState.qCode,
            Category_CD: inputState.qSet,
            Mail_CD: inputState.mail,
            File_Kind: inputState.typeDoc,
            File_Category: inputState.typeGroup || "공통",
            File_Name: inputState.title,
            File_Contents: sData,
          });
          if (
            confirm(
              `[${res.data.result}] ${res.data.msg} \n 확인을 누르면 리스트로 이동됩니다.`
            )
          ) {
            router.push("/admin/dashboard?menu=document");
          }
          setLoading(false);
        }
      } else {
        if (confirm("수정하시겠습니까?")) {
          try {
            setLoading(true);
            const res = await axios.post(UPDATE_QUESTION, {
              App_Name: "document",
              Issue_ID: inputState.iCode,
              Intern_Quest_ID: inputState.qCode,
              Category_CD: inputState.qSet,
              Mail_CD: inputState.mail,
              File_Kind: inputState.typeDoc,
              File_Category: inputState.typeGroup || "공통",
              File_Name: inputState.title,
              File_Contents: sData,
            });
            if (
              confirm(
                `[${res.data.result}] ${res.data.msg} \n 확인을 누르면 리스트로 이동됩니다.`
              )
            ) {
              router.push("/admin/dashboard?menu=document");
            }
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error(error);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      (async () => {
        try {
          setLoading(true);

          const res = await axios.post(SELECT_QUESTION, {
            App_Name: "document",
            Intern_Quest_ID: router.query.id,
          });

          const {
            Category_CD,
            File_Contents,
            File_Kind,
            File_Category,
            File_Name,
            File_No,
            Intern_Quest_ID,
            Issue_ID,
            Mail_CD,
          } = res.data.selectQuestion[0];

          setInputState({
            ...inputState,
            title: File_Name,
            qSet: Category_CD,
            iCode: Issue_ID,
            qCode: Intern_Quest_ID,
            mail: Mail_CD,
            typeDoc: File_Kind,
            typeGroup: File_Category ? File_Category : "공통",
          });

          if (File_Contents) {
            const { contentBlocks, entityMap } = htmlToDraft(File_Contents);
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

  return (
    <div className={styles.container}>
      <AdminEditorNav
        onHandleSubmit={onHandleSubmit}
        title="자료실"
        loc={router.query.id && "document"}
        setIsCopy={setIsCopy}
      />

      {isCopy && (
        <AdminCopy
          copyData={{
            inputState,
            docEditorState: editorState,
          }}
          nowInternQuestID={inputState.qCode}
          nowIssueID={inputState.iCode}
          cfg="document"
          setIsCopy={setIsCopy}
        />
      )}

      <form className={styles.main}>
        <div className={styles.draw}>
          <div className={styles.meta}>
            <div className={styles.info_first}>
              <div className={styles.admin}>
                <span>폴더</span>
                <select
                  onChange={onHandleInputChange}
                  name="qSet"
                  value={inputState.qSet}
                >
                  <option value="1">즐겨찾기</option>
                  <option value="2" defaultValue>
                    개인자료실
                  </option>
                  <option value="3">공용자료실</option>
                  <option value="4"> 프로젝트자료실1</option>
                  <option value="5"> 프로젝트자료실2</option>
                </select>
              </div>
              <div className={styles.qCode}>
                <span>이슈코드</span>
                <input
                  name="iCode"
                  value={inputState.iCode}
                  onChange={onHandleInputChange}
                  readOnly={router.query.id}
                />
              </div>
              <div className={styles.iCode}>
                <span>자료코드</span>
                <input
                  name="qCode"
                  value={inputState.qCode}
                  onChange={onHandleInputChange}
                  readOnly={router.query.id}
                />
              </div>
              <div className={styles.position}></div>
              <div className={styles.type_doc}>
                문서유형
                <select
                  name="typeDoc"
                  value={inputState.typeDoc}
                  onChange={onHandleInputChange}
                >
                  <option value="보고서" defaultValue>
                    보고서
                  </option>
                  <option value="회의록">회의록</option>
                  <option value="공유문서">공유문서</option>
                  <option value="참고자료">참고자료</option>
                  <option value="저널">저널</option>
                  <option value="매거진">매거진</option>
                  <option value="뉴스">뉴스</option>
                  <option value="매뉴얼">매뉴얼</option>
                  <option value="비품대장">비품대장</option>
                  <option value="출장신청서">출장신청서</option>
                  <option value="조직도">조직도</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </div>

            <div className={styles.info_sec}>
              <div className={styles.title}>
                <span>제목</span>
                <input
                  name="title"
                  value={inputState.title}
                  onChange={onHandleInputChange}
                />
              </div>

              <div className={styles.group_doc}>
                <span>사업군</span>
                <select
                  name="typeGroup"
                  value={inputState.typeGroup}
                  onChange={onHandleInputChange}
                >
                  <option value="공통">공통</option>
                  <option value="식품">식품</option>
                  <option value="유통">유통</option>
                  <option value="화학건설">화학건설</option>
                  <option value="서비스외">서비스 외</option>
                </select>
              </div>
            </div>
          </div>
          <Editor
            wrapperClassName={styles.wrapper}
            editorClassName={styles.editor}
            toolbarClassName={styles.toolbar}
            toolbar={{
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: false },
              image: {
                options: ["image"],
                uploadCallback: uploadImageCallBack,
                uploadEnabled: true,
                previewImage: true,
                defaultSize: {
                  height: "auto",
                  width: "auto",
                },
              },
            }}
            placeholder="내용을 작성해주세요."
            localization={{
              locale: "ko",
            }}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
          <div className={styles.textarea} contentEditable="false"></div>
        </div>
        <div className={styles.boundary}>
          <div className={styles.line} />
        </div>
        <div className={styles.view}>
          {parser(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
        </div>
      </form>
      {isLoading && <LoadingAdminFullScreen />}
    </div>
  );
};

export default Board;
