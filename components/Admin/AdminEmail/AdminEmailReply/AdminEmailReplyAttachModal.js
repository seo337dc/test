import axios from "axios";
import { useEffect, useState } from "react";
import {
  GET_ATTACHFILE_DOC_LIST,
  GET_ATTACHFILE_DOC_LIST_ALL,
  UPLOAD_ATTACHFILE_DOC_LIST,
} from "../../../../utils/fetch/apiConfig";
import styles from "./AdminEmailReplyAttachModal.module.scss";

const AdminEmailReplyAttachModal = ({
  setIsAttachModal,
  setReplyAttach,
  metaInfo,
}) => {
  const [attachList, setAttachList] = useState([]);
  const [sendList, setSendList] = useState([]);
  const [originList, setOriginList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(GET_ATTACHFILE_DOC_LIST_ALL);

        let removeFileContents = res.data.documentIssueList.map((obj) => {
          delete obj.File_Contents;
          return obj;
        });

        setAttachList(removeFileContents);
        setOriginList(removeFileContents);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const onHandleAdd = (item) => {
    setAttachList(
      attachList.filter((nowItem) => nowItem.File_No !== item.File_No)
    );
    setSendList(sendList.concat(item));
  };

  const onHandleDel = (item) => {
    setSendList(sendList.filter((nowItem) => nowItem.File_No !== item.File_No));
    setAttachList(attachList.concat(item));
  };

  const onHandleSubmit = async () => {
    try {
      let sendFilList = [];

      for (let i = 0; i < originList.length; i++) {
        for (let j = 0; j < sendList.length; j++) {
          if (originList[i].File_No === sendList[j].File_No) {
            sendFilList.push({ ...originList[i], checked: true });
          } else {
            sendFilList.push({ ...originList[i], checked: false });
          }
        }
      }

      const res = await axios.post(UPLOAD_ATTACHFILE_DOC_LIST, {
        saveDocumentList: sendFilList,
        Mail_CD: metaInfo.Intern_Quest_ID,
      });

      setReplyAttach((prev) => {
        return { ...prev, Attach_Info: sendList };
      });
      setIsAttachModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <i className="xi-close" onClick={() => setIsAttachModal(false)} />
      </div>
      <div className={styles.body}>
        <div className={styles.address}>
          {attachList.map((item) => {
            return (
              <div
                className={styles.list}
                onClick={() => {
                  onHandleAdd(item);
                }}
              >
                <span>{`${item.File_Name} (${item.Intern_Quest_ID})`}</span>
                <i className="xi-arrow-right" />
              </div>
            );
          })}
        </div>
        <div className={styles.send}>
          {sendList.map((item) => {
            return (
              <div className={styles.list} onClick={() => onHandleDel(item)}>
                <i className="xi-arrow-left" />
                <span>{`${item.File_Name} (${item.Intern_Quest_ID})`}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.foot}>
        <div className={styles.btn} onClick={onHandleSubmit}>
          확인
        </div>
      </div>
    </div>
  );
};

export default AdminEmailReplyAttachModal;
