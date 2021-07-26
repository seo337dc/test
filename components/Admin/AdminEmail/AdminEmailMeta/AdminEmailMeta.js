import { useEffect, useState } from "react";
import axios from "axios";
import parser from "react-html-parser";
import {
  ADMIN_ADDR_LOAD,
  GET_ATTACHFILE_DOC_LIST,
  UPLOAD_ATTACHFILE_DOC_LIST,
} from "../../../../utils/fetch/apiConfig";
import styles from "./AdminEmailMeta.module.scss";

const AdminEmailMeta = ({
  metaInfo,
  setReplyAttach,
  setReplyCC,
  setReplyCCHide,
  onHandleFromInfo,
  onHandleInputState,
  onHandleAttachInfo,
  onHandleCCInfo,
}) => {
  const [isFromModal, setIsFromModal] = useState(false);
  const [selectFrom, setSelectFrom] = useState({});

  const [isCCModal, setIsCCModal] = useState(false);
  const [addresList, setAddresList] = useState([]);
  const [sendList, setSendList] = useState([]);

  const [isAttachModal, setIsAttachModal] = useState(false);
  const [attachFileDocList, setAttachFileDocList] = useState([]);

  const [isBoardView, setIsBoardView] = useState(false);
  const [bordView, setBoardView] = useState({
    File_Contents: "",
    File_Name: "",
    Intern_Quest_ID: "none",
  });

  useEffect(() => {
    if (isFromModal) {
      (async () => {
        try {
          const res = await axios.post(ADMIN_ADDR_LOAD, {
            TEST_IDX: 1,
          });
          const tempAry = [];

          res.data.teamListData.forEach((d) =>
            d.addrListData.forEach((a) => tempAry.push(a))
          );
          setAddresList(tempAry);
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      setAddresList([]);
    }
  }, [isFromModal]);

  useEffect(() => {
    if (isCCModal) {
      (async () => {
        try {
          const res = await axios.post(ADMIN_ADDR_LOAD, {
            TEST_IDX: 1,
          });
          const tempAry = [];

          res.data.teamListData.forEach((d) =>
            d.addrListData.forEach((a) => tempAry.push(a))
          );
          setAddresList(tempAry);
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      setAddresList([]);
      setSendList([]);
    }
  }, [isCCModal]);

  useEffect(() => {
    if (isAttachModal) {
      (async () => {
        try {
          const res = await axios.post(GET_ATTACHFILE_DOC_LIST, {
            Issue_ID: metaInfo.Issue_ID,
          });

          setAttachFileDocList(
            res.data.documentIssueList.map((doc) => {
              return {
                ...doc,
                Mail_CD: metaInfo.Intern_Quest_ID,
                checked: doc.checked,
              };
            })
          );
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [isAttachModal]);

  useEffect(() => {
    if (metaInfo.Category_CD !== "7") {
      setReplyAttach((prev) => {
        return { ...prev, Attach_Info: [] };
      });

      setReplyCC((prev) => {
        return { ...prev, CC_Name: [] };
      });
      setReplyCCHide((prev) => {
        return { ...prev, CC_Name: [] };
      });
    }
  }, [metaInfo.Category_CD]);

  const onHandleFromSubmit = () => {
    onHandleFromInfo({
      ...metaInfo,
      From_Name: `${selectFrom.u_name} ${selectFrom.u_position}`,
    });
    setIsFromModal(false);
    setSendList([]);
  };

  const onHandleAdd = (item) => {
    setAddresList(
      addresList.filter((nowItem) => nowItem.addr_no !== item.addr_no)
    );
    setSendList(sendList.concat(item));
  };

  const onHandleDel = (item) => {
    setSendList(sendList.filter((nowItem) => nowItem.addr_no !== item.addr_no));

    setAddresList(addresList.concat(item));
  };

  const onHandleSubmitCC = () => {
    let ccNameList = [];
    sendList.forEach((item) => {
      ccNameList.push(`${item.u_name} ${item.u_position}`);
    });
    onHandleCCInfo({ ...metaInfo, CC_Name: ccNameList.join(";") });
    setIsCCModal(false);
    setAddresList([]);
  };

  const onHandleDocListCheck = (doc) => {
    setAttachFileDocList(
      attachFileDocList.map((nowDoc) => {
        if (doc.File_Name === nowDoc.File_Name) {
          return { ...nowDoc, checked: !doc.checked };
        } else {
          return nowDoc;
        }
      })
    );
  };

  const onHandleChangeBoardView = (e) => {
    if (e.target.value === "none") {
      setBoardView({
        File_Contents: "",
        File_Name: "",
        Intern_Quest_ID: "none",
      });
      return;
    }

    metaInfo.Attach_Info.map((doc) => {
      if (doc.Intern_Quest_ID === e.target.value) {
        setBoardView(doc);
      }
    });
  };

  const onHandleSubmitDoc = async (type) => {
    try {
      if (type === "del") {
        let newFileList = metaInfo.Attach_Info.map((data) => {
          return { ...data, checked: true };
        });

        const res = await axios.post(UPLOAD_ATTACHFILE_DOC_LIST, {
          saveDocumentList: newFileList,
          Issue_ID: metaInfo.Issue_ID,
          Mail_CD: "",
        });

        onHandleAttachInfo({
          ...metaInfo,
          Attach_Info: [],
        });
      } else {
        const res = await axios.post(UPLOAD_ATTACHFILE_DOC_LIST, {
          saveDocumentList: attachFileDocList,
          Mail_CD: metaInfo.Intern_Quest_ID,
          Issue_ID: metaInfo.Issue_ID,
        });

        onHandleAttachInfo({
          ...metaInfo,
          Attach_Info: res.data.documentList,
        });
      }

      setIsAttachModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrap}>
      {isFromModal && (
        <div className={styles.fromModal}>
          <div className={styles.head}>
            <i className="xi-close" onClick={() => setIsFromModal(false)} />
          </div>
          <div className={styles.body}>
            <div className={styles.addressFrom}>
              {addresList.map((item, index) => {
                if (item.addr_no === selectFrom.addr_no) {
                  return (
                    <div className={styles.listOn} key={index}>
                      <span>{`${item.u_name} ${item.u_position}`}</span>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={styles.listOff}
                      key={index}
                      onClick={() => setSelectFrom(item)}
                    >
                      <span>{`${item.u_name} ${item.u_position}`}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className={styles.foot}>
            <div className={styles.btn} onClick={onHandleFromSubmit}>
              확인
            </div>
          </div>
        </div>
      )}

      {isCCModal && (
        <div className={styles.ccModal}>
          <div className={styles.head}>
            <i className="xi-close" onClick={() => setIsCCModal(false)} />
          </div>

          <div className={styles.body}>
            <div className={styles.addressCC}>
              {addresList.map((item, index) => {
                return (
                  <div
                    className={styles.list}
                    key={index}
                    onClick={() => {
                      onHandleAdd(item);
                    }}
                  >
                    <span>{`${item.u_name} ${item.u_position}`}</span>
                    <i className="xi-arrow-right" />
                  </div>
                );
              })}
            </div>
            <div className={styles.send}>
              {sendList.map((item, index) => {
                return (
                  <div
                    className={styles.list}
                    key={index}
                    onClick={() => onHandleDel(item)}
                  >
                    <i className="xi-arrow-left" />
                    <span>{`${item.u_name} ${item.u_position}`}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.foot}>
            <div className={styles.btn} onClick={onHandleSubmitCC}>
              확인
            </div>
          </div>
        </div>
      )}

      {isAttachModal && (
        <div className={styles.attachModal}>
          <div className={styles.head}>
            <i className="xi-close" onClick={() => setIsAttachModal(false)} />
          </div>

          <div className={styles.body}>
            {attachFileDocList.map((doc, index) => {
              return (
                <div className={styles.item} key={index}>
                  <input
                    type="checkbox"
                    checked={doc.checked ? true : false}
                    onChange={() => {
                      onHandleDocListCheck(doc);
                    }}
                  />
                  <span>{doc.File_Kind}</span>
                  <span>{doc.File_Name}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.foot}>
            <div
              className={styles.btn}
              onClick={() => {
                onHandleSubmitDoc("normal");
              }}
            >
              확인
            </div>
          </div>
        </div>
      )}

      {isBoardView && (
        <div className={styles.boardModal}>
          <div className={styles.head}>
            <i
              className="xi-close"
              onClick={() => {
                setIsBoardView(false);
                setBoardView("");
              }}
            />
          </div>

          <div className={styles.body}>
            <div className={styles.choice}>
              <span>선택 :</span>
              <select
                onChange={onHandleChangeBoardView}
                value={bordView.Intern_Quest_ID}
              >
                <option value="none">=== 선택 ===</option>
                {metaInfo.Attach_Info.map((doc) => {
                  return (
                    <option
                      key={doc.File_No}
                      value={doc.Intern_Quest_ID}
                    >{`${doc.File_Name};`}</option>
                  );
                })}
              </select>
            </div>
            <div className={styles.board}>{parser(bordView.File_Contents)}</div>
          </div>
        </div>
      )}

      <div className={styles.top}>
        <div className={styles.from}>
          <span>보낸이</span>
          <div className={styles.name}>{metaInfo.From_Name}</div>

          <i
            className="xi-plus-circle"
            onClick={() => setIsFromModal(!isFromModal)}
          />
        </div>

        <div className={styles.category}>
          <span>메일 목적</span>
          <select
            name="Category_CD"
            onChange={onHandleInputState}
            value={metaInfo.Category_CD}
          >
            <option value="6">회신</option>
            <option value="7">공지사항</option>
          </select>
        </div>

        <div className={styles.issue}>
          <span>이슈코드</span>
          <input
            type="text"
            name="Issue_ID"
            value={metaInfo.Issue_ID}
            onChange={onHandleInputState}
          />
        </div>

        <div className={styles.quest}>
          <span>자료코드</span>
          <input
            type="text"
            name="Intern_Quest_ID"
            value={metaInfo.Intern_Quest_ID}
            onChange={onHandleInputState}
          />
        </div>
      </div>

      <div className={styles.ref}>
        <div className={styles.container}>
          <span>참조</span>
          <div className={styles.cc}>{metaInfo.CC_Name}</div>

          <i className="xi-plus-circle" onClick={() => setIsCCModal(true)} />
        </div>

        <div className={styles.file}>
          <span>파일</span>

          <span className={styles.select}>
            {metaInfo.Attach_Info.length > 0 ? "Y" : "N"}
          </span>

          <>
            <div className={styles.filename}>
              {metaInfo.Attach_Info.map((doc, index) => {
                return <span key={index}>{`${doc.File_Name};`}</span>;
              })}
            </div>
            <i
              className="xi-plus-circle"
              onClick={() => {
                setIsAttachModal(true);
              }}
            />
            <i
              className="xi-minus-circle"
              onClick={() => {
                onHandleSubmitDoc("del");
              }}
            />

            {metaInfo.Attach_Info.length > 0 && (
              <i
                className="xi-help"
                title="자료실 보기"
                onClick={() => setIsBoardView(true)}
              />
            )}
          </>
        </div>
      </div>
      <div className={styles.subject}>
        <span>제목 </span>
        <input
          type="text"
          name="Mail_Subject"
          value={metaInfo.Mail_Subject}
          onChange={onHandleInputState}
        />
      </div>
    </div>
  );
};

export default AdminEmailMeta;
