import BookMark from "../../../SVGIcons/BookMark";
import styles from "./DocsEmptyList.module.scss";

const DocsEmptyList = ({ categoryCD, OpenYN }) => {
  return (
    <div className={styles.wrap}>
      {(() => {
        if (OpenYN === "Y" || !OpenYN) {
          if (categoryCD == 1) {
            return (
              <>
                <img src="/img/empty_folder.svg" alt="empty" />
                <div className={styles.text}>
                  아직 즐겨찾기한 자료가 없습니다.
                </div>
                <div className={styles.text}>
                  자주 보고싶은 자료를 <BookMark marked="Y" /> 버튼을 통해 채워
                  넣어보세요!
                </div>
              </>
            );
          } else if (categoryCD == 2) {
            return (
              <>
                <img src="/img/empty_folder.svg" alt="empty" />
                <div className={styles.text}>
                  아직 다운받은 자료가 없습니다.
                </div>
                <div className={styles.text}>
                  메일이나 메신저에서 첨부파일을 다운 받아 이 곳에서 확인하세요!
                </div>
              </>
            );
          }
        } else {
          return <img src="/img/empty_locked_folder.svg" alt="empty" />;
        }
      })()}
    </div>
  );
};

export default DocsEmptyList;
