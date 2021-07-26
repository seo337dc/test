import { useEffect, useState } from "react";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import AdminTableRadio from "./AdminTableUtil/AdminTableRadio";
import AdminTableMeetingContentRadio from "./AdminTableUtil/AdminTableMeetingContentRadio";
import AdminTableMeetingContentText from "./AdminTableUtil/AdminTableMeetingContentText";
import styles from "./AdminTableMeeting.module.scss";

const AdminTableMeeting = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
  Intern_Quest_ID,
}) => {
  const [doc, setDoc] = useState({
    docNum: "",
    docWriter: "",
    docWriterDate: "",
  });

  const [summary, setSummary] = useState({
    group: "",
    period: "",
    location: "",
    time: "",
    totalMember: "",
    ect: "",
  });

  const [agenda, setAgenda] = useState(); //안건
  const [purpose, setPurpose] = useState(); //목적
  const [contentList, setContentList] = useState([]); //회의 내용

  useEffect(() => {
    const { doc, summary, content } = data;

    if (summary) setSummary(summary);

    if (doc) setDoc(doc);

    if (content && content.agenda) setAgenda(content.agenda);

    if (content && content.purpose) setPurpose(content.purpose);

    if (content && content.contentList.length) {
      setContentList(content.contentList);
    }
  }, [data]);

  const onChangeSummary = (e) => {
    setSummary({ ...summary, [e.target.name]: e.target.value });
  };

  const onHandleContentAdd = (type) => {
    let newContent = {
      index:
        contentList.length > 0
          ? parseInt(contentList[contentList.length - 1].index) + 1 + ""
          : "0",
      type,
    };

    if (type === "content_text") {
      newContent.text = "";
    } else {
      newContent.remark1 = "";
      newContent.remark2 = "";
      newContent.remark3 = "";
      newContent.question = "";
    }

    setContentList(contentList.concat(newContent));
  };

  const onHandleEditConfirm = () => {
    for (let i in contentList) {
      if (contentList[i].type === "content_radio" && !contentList[i].list) {
        alert("회의 내용 작성을 완료해 주세요.");
        return;
      }
    }

    if (!agenda || !purpose || !contentList.length) {
      if (
        !confirm(
          "[안건], [목적] 또는 [내용]이 없습니다. 그래도 추가하시겠습니까?"
        )
      ) {
        return;
      }
    }

    if (!confirm("회의록 내용을 추가/수정 하시겠습니까?")) return;

    setEditorDataList((prevEditorList) =>
      prevEditorList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            doc,
            summary,
            content: {
              agenda,
              purpose,
              contentList,
            },
          };
        } else {
          return editorData;
        }
      })
    );
  };

  const onHandleAgendaPuroseConfirm = (type, list, code, remark) => {
    setEditorDataList((prevEditorList) =>
      prevEditorList.map((editorData) => {
        if (editorData.id === data.id) {
          if (type === "agenda") {
            return {
              ...editorData,
              doc,
              summary,
              content: {
                ...editorData.content,
                agenda: {
                  list,
                  code,
                  remark,
                },
                purpose,
                contentList,
              },
            };
          } else if (type === "purpose") {
            return {
              ...editorData,
              doc,
              summary,
              content: {
                ...editorData.content,
                purpose: {
                  list,
                  code,
                  remark,
                },
                agenda,
                contentList,
              },
            };
          }
        } else {
          return editorData;
        }
      })
    );
  };

  const onHandleAgendaPurposeDel = (type) => {
    setEditorDataList((prevEditorList) =>
      prevEditorList.map((editorData) => {
        if (editorData.id === data.id) {
          if (type === "agenda") {
            return {
              ...editorData,
              doc,
              summary,
              content: {
                ...editorData.content,
                agenda: {
                  list: [],
                  code: { ...editorData.code, answer: "" },
                  remark: {
                    remark1: "",
                    remark2: "",
                    remark3: "",
                  },
                },
                purpose,
                contentList,
              },
            };
          } else if (type === "purpose") {
            return {
              ...editorData,
              doc,
              summary,
              content: {
                ...editorData.content,
                purpose: {
                  list: [],
                  code: { ...editorData.code, answer: "" },
                  remark: {
                    remark1: "",
                    remark2: "",
                    remark3: "",
                  },
                },
                agenda,
                contentList,
              },
            };
          }
        } else {
          return editorData;
        }
      })
    );
  };

  //회의 내용 라디오 적용
  const onHandleContentsListAdd = (
    content,
    radioList,
    code,
    answer,
    question
  ) => {
    const newContentList = contentList.map((ctn) => {
      if (ctn.index === content.index) {
        return {
          ...ctn,
          list: radioList,
          question,
          code: { ...code, answer },
        };
      } else {
        return ctn;
      }
    });

    setEditorDataList((prevEditorList) =>
      prevEditorList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            doc,
            summary,
            content: {
              agenda,
              purpose,
              contentList: newContentList,
            },
          };
        } else {
          return editorData;
        }
      })
    );
  };

  const onHandleContentRemark = (e, content) => {
    const newContentList = contentList.map((ctn) => {
      if (ctn.index === content.index) {
        return {
          ...content,
          [e.target.name]: e.target.value,
        };
      } else {
        return ctn;
      }
    });

    setContentList(newContentList);
  };

  //회의 내용 라디오 삭제
  const onHandleContentsListDel = (content) => {
    const newContentList = contentList.filter(
      (ctn) => ctn.index !== content.index
    );

    setEditorDataList((prevEditorList) =>
      prevEditorList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            doc,
            summary,
            content: {
              agenda,
              purpose,
              contentList: newContentList,
            },
          };
        } else {
          return editorData;
        }
      })
    );
  };

  //회의 내용 텍스트 적용
  const onHandleContentsTextAdd = (content, textareaInput) => {
    const newContentList = contentList.map((ctn) => {
      if (ctn.index === content.index) {
        return {
          ...ctn,
          text: textareaInput,
        };
      } else {
        return ctn;
      }
    });

    setEditorDataList((prevEditorList) =>
      prevEditorList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            doc,
            summary,
            content: {
              agenda,
              purpose,
              contentList: newContentList,
            },
          };
        } else {
          return editorData;
        }
      })
    );
  };

  //회의 내용 텍스트 삭제
  return (
    <AdminEmailLayout title="회의록">
      <div className={styles.wrap}>
        <div className={styles.title}>
          <div className={styles.text}>
            <span>회의록</span>
          </div>
          <div className={styles.btn} onClick={onHandleEditConfirm}>
            확인
          </div>
          <div className={styles.btn} onClick={() => onHandleEditDelete(data)}>
            삭제
          </div>
        </div>
        <div className={styles.doc}>
          <div className={styles.odd}>
            <span>문서번호</span>
          </div>
          <div className={styles.even}>
            <input
              type="text"
              placeholder="팀명 - 회의 번호 입력"
              name="docNum"
              value={doc.docNum}
              onChange={(e) =>
                setDoc({ ...doc, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.odd}>
            <span>작성자</span>
          </div>
          <div className={styles.even}>
            <input
              type="text"
              placeholder="작성자 입력"
              name="docWriter"
              value={`응시자`}
              disabled={true}
            />
          </div>
          <div className={styles.odd}>
            <span>작성일자</span>
          </div>
          <div className={styles.last}>
            <input
              name="docWriterDate"
              placeholder="작성 일자 입력"
              value={`검사 날짜`}
              disabled={true}
            />
          </div>
        </div>
        <div className={styles.subtitle}>
          <span>1. 회의 개요</span>
        </div>

        <div className={styles.summary}>
          <div className={styles.container}>
            <div className={styles.odd}>
              <span>소속</span>
            </div>
            <div className={styles.even}>
              <input
                type="text"
                placeholder="소속 입력"
                name="group"
                value={summary.group}
                onChange={onChangeSummary}
              />
            </div>
            <div className={styles.odd}>
              <span>회의 날짜</span>
            </div>
            <div className={styles.last}>
              <input
                type="text"
                placeholder="날짜을 입력해주세요"
                name="period"
                value={summary.period}
                onChange={onChangeSummary}
              />
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.odd}>
              <span>회의 장소</span>
            </div>
            <div className={styles.even}>
              <input
                type="text"
                placeholder="장소를 입력해주세요."
                name="location"
                value={summary.location}
                onChange={onChangeSummary}
              />
            </div>
            <div className={styles.odd}>
              <span>회의 시간</span>
            </div>
            <div className={styles.last}>
              <input
                type="text"
                placeholder="시간을 입력해주세요"
                name="time"
                value={summary.time}
                onChange={onChangeSummary}
              />
            </div>
          </div>
          <div className={styles.container_last}>
            <div className={styles.odd}>참석 인원</div>
            <div className={styles.last}>
              <input
                className={styles.totalmember}
                placeholder="참석 인원을 작성해 주세요."
                name="totalMember"
                value={summary.totalMember}
                onChange={onChangeSummary}
              />
            </div>
          </div>
        </div>

        <div className={styles.agenda}>
          <div className={styles.title}>
            <p>1-1. 회의 안건</p>
            <p>
              {agenda
                ? ` [회의 안건이 있습니다.]`
                : `- [회의 안건이 없습니다.]`}
            </p>
          </div>
          <AdminTableRadio
            data={agenda}
            setData={setAgenda}
            onHandleAgendaPuroseConfirm={onHandleAgendaPuroseConfirm}
            onHandleAgendaPurposeDel={onHandleAgendaPurposeDel}
            type="agenda"
            Intern_Quest_ID={Intern_Quest_ID}
          />
        </div>

        <div className={styles.purpose}>
          <div className={styles.title}>
            <p>1-2. 회의 목적</p>
            <p>
              {purpose
                ? ` [회의 목적이 있습니다.]`
                : `- [회의 목적이 없습니다.]`}
            </p>
          </div>
          <AdminTableRadio
            data={purpose}
            setData={setPurpose}
            onHandleAgendaPuroseConfirm={onHandleAgendaPuroseConfirm}
            onHandleAgendaPurposeDel={onHandleAgendaPurposeDel}
            type="purpose"
            Intern_Quest_ID={Intern_Quest_ID}
          />
        </div>

        <div className={styles.contents}>
          <div className={styles.title}>
            <p>2. 회의 내용</p> <p>{`${contentList.length}개`}</p>
            <span onClick={() => onHandleContentAdd("content_radio")}>
              라디오 추가
            </span>
            <span onClick={() => onHandleContentAdd("content_text")}>
              텍스트 추가
            </span>
          </div>

          {contentList.map((content, index) => {
            if (content.type === "content_radio") {
              return (
                <>
                  <div className={styles.content_quetion}>
                    질문 :
                    <input
                      placeholder="입력"
                      name="remark1"
                      value={content.remark1 || ""}
                      onChange={(e) => onHandleContentRemark(e, content)}
                    />
                    <input
                      placeholder="강조"
                      name="remark2"
                      value={content.remark2 || ""}
                      onChange={(e) => onHandleContentRemark(e, content)}
                    />
                    <input
                      placeholder="입력"
                      name="remark3"
                      value={content.remark3 || ""}
                      onChange={(e) => onHandleContentRemark(e, content)}
                    />
                  </div>

                  <AdminTableMeetingContentRadio
                    key={index}
                    content={content}
                    onHandleContentsListAdd={onHandleContentsListAdd}
                    onHandleContentsListDel={onHandleContentsListDel}
                    Intern_Quest_ID={Intern_Quest_ID}
                  />
                </>
              );
            } else {
              return (
                <AdminTableMeetingContentText
                  key={index}
                  content={content}
                  onHandleContentsTextAdd={onHandleContentsTextAdd}
                  onHandleContentsListDel={onHandleContentsListDel}
                />
              );
            }
          })}
        </div>

        <div className={styles.subtitle}>
          <span>3. 추후 확인 사항</span>
        </div>
        <div className={styles.ect}>
          <div className={styles.odd}>추후 확인 사항</div>
          <div className={styles.last}>
            <input
              type="text"
              name="ect"
              placeholder="추후 확인 사항 입력하지 않아도 무관"
              value={summary.ect}
              onChange={onChangeSummary}
            />
          </div>
        </div>
      </div>
    </AdminEmailLayout>
  );
};

export default AdminTableMeeting;
