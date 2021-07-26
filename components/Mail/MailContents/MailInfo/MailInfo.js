import { useState } from "react";
import axios from "axios";
import ItemBoxBtn from "../../../Buttons/ItemBox/ItemBoxBtn";
import { FILE_DOWINLOAD } from "../../../../utils/fetch/apiConfig";
import styles from "./MailInfo.module.scss";

const MailInfo = ({ infoData, setViewData, isTo }) => {
  const [isLoading, setIsLoading] = useState(false);

  const fileDownload = async (info) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await axios.post(FILE_DOWINLOAD, {
        internQuestId: info.attach_file_list[0].INTERN_QUEST_ID,
      });

      if (res.data.result === "OK") {
        setIsLoading(false);
        setViewData({ ...infoData, chkDownLoad: "Y" });
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.right}>보낸 사람</div>
        <div className={styles.ctx}>{infoData.from_name}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.right}>받는 사람</div>
        <div className={styles.ctx}>{infoData.to_name}</div>
      </div>
      {infoData.cc_name.length > 0 && (
        <div className={styles.container}>
          <div className={styles.right}>참조</div>
          <div className={styles.ctx}>
            {infoData.cc_name.map((cc) => `${cc.u_name} ${cc.u_position}; `)}
          </div>
        </div>
      )}

      {!isTo
        ? infoData.attach_file_list.length !== 0 && (
            <div className={styles.container}>
              <div className={styles.right}>첨부파일</div>

              <div className={styles.files}>
                {infoData.chkDownLoad === "Y" ? (
                  <ItemBoxBtn key={`mainView_all`} ditinct="all_down_off">
                    <i className="xi-check" />
                    {`저장완료`}
                  </ItemBoxBtn>
                ) : (
                  <ItemBoxBtn
                    key={`mainView_all`}
                    onClick={() => fileDownload(infoData)}
                  >
                    <i className="xi-download" />
                    {`전체저장`}
                  </ItemBoxBtn>
                )}

                {infoData.attach_file_list.map((file, idx) => (
                  <ItemBoxBtn
                    ditinct={infoData.chkDownLoad === "Y" && "file_off"}
                    key={`mainView_${file}_${idx}`}
                  >
                    <i className="xi-file-o" />
                    <span>{file.FILE_KIND}</span>
                    <span>{file.FILE_NAME}</span>
                  </ItemBoxBtn>
                ))}

                {isLoading && (
                  <span>
                    <i className="xi-spinner-1 xi-spin" />
                    다운로드 중...
                  </span>
                )}
              </div>
            </div>
          )
        : infoData.attach_file_list.length !== 0 && (
            <div className={styles.container}>
              <div className={styles.right}>첨부파일</div>

              <div className={styles.files}>
                {infoData.attach_file_list.map((file, idx) => (
                  <ItemBoxBtn
                    ditinct={"file_off"}
                    key={`mainView_${file}_${idx}`}
                  >
                    <i className="xi-file-o" />
                    <span>{file.FILE_KIND}</span>
                    <span>{file.FILE_NAME}</span>
                  </ItemBoxBtn>
                ))}
              </div>
            </div>
          )}
    </div>
  );
};

export default MailInfo;
