import { useState } from "react";
import PlusBtn from "../../../Buttons/PlusBtn/PlusBtn";
import DownBtn from "../../../Buttons/DownBtn/DownBtn";
import ItemBoxBtn from "../../../Buttons/ItemBox/ItemBoxBtn";
import FileAttachment from "../../../FileAttachment/FileAttachment";
import styles from "./MailWriteInfo.module.scss";

const MailWriteInfo = ({ viewData, setViewData }) => {
  const [flag, setFlag] = useState(true);
  const [isFileModalOpen, setFileModalOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.title}>제목</div>
        <div className={styles.ctx}>{`RE: ${viewData.mail_subject}`}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>첨부파일</div>

        <div className={styles.btn}>
          <DownBtn onClick={() => setFlag(!flag)} flag={flag} />
        </div>

        <div className={styles.files}>
          <PlusBtn onClick={() => setFileModalOpen(true)}>파일선택</PlusBtn>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.title}></div>
        {flag && (
          <div className={styles.file_list}>
            {viewData.replyFile.map((file) => (
              <ItemBoxBtn ditinct={"file_on"} key={file.list_no}>
                <i className="xi-file-o" />
                <span>{file.list_kind}</span>
                <span>{file.list_name}</span>
              </ItemBoxBtn>
            ))}
          </div>
        )}
      </div>

      {isFileModalOpen && (
        <FileAttachment
          viewData={viewData}
          setViewData={setViewData}
          setModalOpen={setFileModalOpen}
        />
      )}
    </div>
  );
};

export default MailWriteInfo;
