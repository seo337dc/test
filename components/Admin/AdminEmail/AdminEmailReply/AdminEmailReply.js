import { useEffect, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import Scrollbar from "react-scrollbars-custom";
import AdminEmailToolbar from "./AdminEmailToolbar/AdminEmailToolbar";
import AdminEmailTextArea from "../AdminEmailEdit/AdminEmailTextArea";
import AdminEmailEditInput from "../AdminEmailEdit/AdminEmailEditInput";
import AdminEmailEditDropBox from "../AdminEmailEdit/AdminEmailEditDropBox";
import AdminEmailEditRadio from "../AdminEmailEdit/AdminEmailEditRadio";
import AdminEmailEditCheckBox from "../AdminEmailEdit/AdminEmailEditCheckBox";
import AdminEmailEditImage from "../AdminEmailEdit/AdminEmailEditImage";
import AdminEmailEditBr from "../AdminEmailEdit/AdminEmailEditBr";
import AdminTableTrip from "../AdminEmailEdit/AdminTableTrip";
import AdminTableMeeting from "../AdminEmailEdit/AdminTableMeeting";
import AdminCustomTable from "../AdminEmailEdit/AdminCustomTable";
import AdminEmailReplyModal from "./AdminEmailReplyModal";
import AdminEmailReplyAttachModal from "./AdminEmailReplyAttachModal";
import {
  convertCodeList,
  convertCodeListWithReply,
} from "../../../../utils/common/adminFun";
import styles from "./AdminEmailReply.module.scss";
import AdminEmailText from "../AdminEmailEdit/AdminEmailText";
import AdminQuestion from "../AdminEmailEdit/AdminQuestion";
import AdminEmailEditSeq from "../AdminEmailEdit/AdminEmailEditSeq";

const AdminEmailReply = ({
  editorDataList,
  setEditorDataList,
  replyAttach,
  setReplyAttach,
  replyCC,
  setReplyCC,
  replyCCHide,
  setReplyCCHide,
  metaInfo,
  onHandleEditDelete,
}) => {
  const [isCode, setIsCode] = useState(false);

  const [isCCModal, setIsCCModal] = useState(false);

  const [isHideCCModal, setIssHideCCModal] = useState(false);

  const [isAttachModal, setIsAttachModal] = useState(false);

  useEffect(() => {
    setReplyAttach({
      ...replyAttach,
      Attach_Info_Code:
        replyAttach.Attach_Info_Code || metaInfo.Intern_Quest_ID + "_",
    });

    setReplyCC({
      ...replyCC,
      CC_Name_Code: replyCC.CC_Name_Code || metaInfo.Intern_Quest_ID + "_",
    });

    setReplyCCHide({
      ...replyCCHide,
      CC_Name_Code: replyCCHide.CC_Name_Code || metaInfo.Intern_Quest_ID + "_",
    });
  }, []);

  const onClickReplyAble = (type) => {
    if (type === "cc") {
      if (replyCC.isAble) {
        setReplyCC({ ...replyCC, isAble: !replyCC.isAble, CC_Name: [] });
      } else {
        setReplyCC({ ...replyCC, isAble: !replyCC.isAble });
      }
    }

    if (type === "cc_hide") {
      if (replyCC.isAble) {
        setReplyCCHide({
          ...replyCCHide,
          isAble: !replyCCHide.isAble,
          CC_Name: [],
        });
      } else {
        setReplyCCHide({ ...replyCCHide, isAble: !replyCCHide.isAble });
      }
    }

    if (type === "attach")
      if (replyAttach.isAble) {
        setReplyAttach({
          ...replyAttach,
          isAble: !replyAttach.isAble,
          Attach_Info: [],
        });
      } else {
        setReplyAttach({
          ...replyAttach,
          isAble: !replyAttach.isAble,
        });
      }
  };

  const onChangeReplyAttachCode = (e) => {
    setReplyAttach({ ...replyAttach, Attach_Info_Code: e.target.value });
  };

  const onChangeReplyCCCode = (e) => {
    setReplyCC({ ...replyCC, CC_Name_Code: e.target.value });
  };

  const onChangeReplyCCHideCode = (e) => {
    setReplyCCHide({ ...replyCCHide, CC_Name_Code: e.target.value });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const nowState = arrayMove(editorDataList, oldIndex, newIndex);
    setEditorDataList(
      nowState.map((state, index) => {
        return { ...state, id: index + "" };
      })
    );
  };

  const SortableItem = SortableElement(({ data }) => {
    switch (data.type) {
      case "text":
      case "p":
        return (
          <AdminEmailText
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
          />
        );

      case "textarea":
      case "parea":
        return (
          <AdminEmailTextArea
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
          />
        );

      case "br":
        return (
          <AdminEmailEditBr
            onHandleEditDelete={onHandleEditDelete}
            data={data}
          />
        );

      case "blank":
        return (
          <AdminEmailEditBr
            onHandleEditDelete={onHandleEditDelete}
            data={data}
          />
        );

      case "input":
        return (
          <AdminEmailEditInput
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
            Intern_Quest_ID={metaInfo.Intern_Quest_ID}
          />
        );

      case "dropbox":
        return (
          <AdminEmailEditDropBox
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
            Intern_Quest_ID={metaInfo.Intern_Quest_ID}
          />
        );

      case "radio":
        return (
          <AdminEmailEditRadio
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
            Intern_Quest_ID={metaInfo.Intern_Quest_ID}
          />
        );

      case "checkbox":
        return (
          <AdminEmailEditCheckBox
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
            Intern_Quest_ID={metaInfo.Intern_Quest_ID}
          />
        );

      case "seqCheck":
        return (
          <AdminEmailEditSeq
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
            Intern_Quest_ID={metaInfo.Intern_Quest_ID}
          />
        );

      case "image":
        return (
          <AdminEmailEditImage
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
          />
        );

      case "trip":
        return (
          <AdminTableTrip
            editorDataList={editorDataList}
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
            Intern_Quest_ID={metaInfo.Intern_Quest_ID}
          />
        );

      case "meeting":
        return (
          <AdminTableMeeting
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
            Intern_Quest_ID={metaInfo.Intern_Quest_ID}
          />
        );

      case "table":
        return (
          <AdminCustomTable
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
            Intern_Quest_ID={metaInfo.Intern_Quest_ID}
          />
        );

      case "question":
        return (
          <AdminQuestion
            setEditorDataList={setEditorDataList}
            onHandleEditDelete={onHandleEditDelete}
            data={data}
          />
        );

      default:
        return <div />;
    }
  });

  const SortableList = SortableContainer(({ editorDataList }) => {
    return (
      <div>
        {editorDataList.map((data) => (
          <SortableItem
            key={`item-${data.id}`}
            index={parseInt(data.id)}
            data={data}
          />
        ))}
      </div>
    );
  });

  return (
    <div className={styles.wrap}>
      {metaInfo.Category_CD === "6" && (
        <div className={styles.replyInfo}>
          <div className={styles.replyCC}>
            <i
              className={
                replyCC.isAble ? "xi-check-square-o" : "xi-checkbox-blank"
              }
              onClick={() => {
                onClickReplyAble("cc");
              }}
            />

            <span>참조(RE) :</span>
            {replyCC.isAble && (
              <>
                <div className={styles.info}>
                  {replyCC.CC_Name.map((item) => {
                    return ` ${item.u_name} ${item.u_position};`;
                  })}
                </div>
                <i
                  className="xi-plus-circle"
                  onClick={() => setIsCCModal(true)}
                />
                <span>고유코드 :</span>
                <input
                  type="text"
                  name="CC_Name_Code"
                  placeholder="코드 입력"
                  value={replyCC.CC_Name_Code.trim()}
                  onChange={onChangeReplyCCCode}
                />
                <span>순서</span>
                <input
                  type="checkbox"
                  checked={replyCC.isSeq}
                  onChange={() =>
                    setReplyCC({ ...replyCC, isSeq: !replyCC.isSeq })
                  }
                />
              </>
            )}
          </div>
          <div className={styles.replyHideCC}>
            <i
              className={
                replyCCHide.isAble ? "xi-check-square-o" : "xi-checkbox-blank"
              }
              onClick={() => {
                onClickReplyAble("cc_hide");
              }}
            />
            <span>숨은 참조(RE) :</span>
            {replyCCHide.isAble && (
              <>
                <div className={styles.info}>
                  {replyCCHide.CC_Name.map((item) => {
                    return ` ${item.u_name} ${item.u_position};`;
                  })}
                </div>
                <i
                  className="xi-plus-circle"
                  onClick={() => {
                    setIssHideCCModal(true);
                  }}
                />
                <span>고유코드 :</span>
                <input
                  type="text"
                  name="CC_Name_Code"
                  placeholder="코드 입력"
                  value={replyCCHide.CC_Name_Code.trim()}
                  onChange={onChangeReplyCCHideCode}
                />

                <span>순서</span>
                <input
                  type="checkbox"
                  checked={replyCCHide.isSeq}
                  onChange={() =>
                    setReplyCCHide({
                      ...replyCCHide,
                      isSeq: !replyCCHide.isSeq,
                    })
                  }
                />
              </>
            )}
          </div>

          <div className={styles.replyAttach}>
            <i
              className={
                replyAttach.isAble ? "xi-check-square-o" : "xi-checkbox-blank"
              }
              onClick={() => {
                onClickReplyAble("attach");
              }}
            />
            <span>첨부(RE) :</span>
            {replyAttach.isAble && (
              <>
                <div className={styles.info}>
                  {replyAttach.Attach_Info.map((item) => `${item.File_Name};`)}
                </div>
                <i
                  className="xi-plus-circle"
                  onClick={() => {
                    setIsAttachModal(true);
                  }}
                />
                <span>고유코드 :</span>
                <input
                  type="text"
                  name="Attach_Info_Code"
                  placeholder="코드 입력"
                  value={replyAttach.Attach_Info_Code.trim()}
                  onChange={onChangeReplyAttachCode}
                />

                <span>순서</span>
                <input
                  type="checkbox"
                  checked={replyAttach.isSeq}
                  onChange={() =>
                    setReplyAttach({
                      ...replyAttach,
                      isSeq: !replyAttach.isSeq,
                    })
                  }
                />
              </>
            )}
          </div>
        </div>
      )}

      {isCCModal && (
        <AdminEmailReplyModal setIsModal={setIsCCModal} setReply={setReplyCC} />
      )}

      {isHideCCModal && (
        <AdminEmailReplyModal
          setIsModal={setIssHideCCModal}
          setReply={setReplyCCHide}
        />
      )}

      {isAttachModal && (
        <AdminEmailReplyAttachModal
          setIsAttachModal={setIsAttachModal}
          setReplyAttach={setReplyAttach}
          metaInfo={metaInfo}
        />
      )}

      <AdminEmailToolbar
        setEditorDataList={setEditorDataList}
        setIsCode={setIsCode}
      />

      {isCode && (
        <div className={styles.modal}>
          <div className={styles.top}>
            <i className="xi-close" onClick={() => setIsCode(false)} />
          </div>
          {convertCodeListWithReply(
            editorDataList,
            replyCC,
            replyAttach,
            replyCCHide
          ).length &&
            convertCodeListWithReply(
              editorDataList,
              replyCC,
              replyAttach,
              replyCCHide
            ).map((code) => {
              if (!code) return;

              return (
                <div className={styles.code}>
                  <span>{code.Quest_IDX} : </span>
                  <span>{code.Answer}</span>
                  <span>{code.showType ? code.showType : ""}</span>
                  <span>{code.count ? code.count : ""}</span>
                </div>
              );
            })}
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.editor}>
          <div className={styles.main}>
            <Scrollbar
              style={{ height: "100%" }}
              disableTracksWidthCompensation
            >
              <SortableList
                editorDataList={editorDataList}
                onSortEnd={onSortEnd}
                pressDelay={200}
                useDragHandle={true}
              />
            </Scrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmailReply;
