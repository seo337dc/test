import moment from "moment";
import styles from "./UploadVoice.module.scss";

const UploadVoice = ({ file, setFile }) => {
  return (
    <div className={styles.wrap}>
      MP3 업로드
      <div className={styles.container}>
        <input
          type="file"
          className={styles.btn}
          accept=".mp3"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      {typeof file === "string" && (
        <div className={styles.ctx}>
          <div className={styles.title}>업로드 됨:</div>
          {file}
        </div>
      )}
      {file && (
        <>
          {file.name && (
            <div className={styles.ctx}>
              <div className={styles.title}>파일명:</div>
              {file.name}
            </div>
          )}
          {file.size && (
            <div className={styles.ctx}>
              <div className={styles.title}>크기:</div>
              {(file.size / (1024 * 1024)).toFixed(3)} MB
            </div>
          )}
          {file.type && (
            <div className={styles.ctx}>
              <div className={styles.title}>타입:</div>
              {file.type}
            </div>
          )}
          {file.lastModifiedDate && (
            <div className={styles.ctx}>
              <div className={styles.title}>마지막 수정일:</div>
              {moment(file.lastModifiedDate).format("YYYY-MM-DD")}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UploadVoice;
