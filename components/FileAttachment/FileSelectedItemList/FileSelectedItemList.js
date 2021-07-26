import Scrollbar from "react-scrollbars-custom";
import styles from "./FileSelectedItemList.module.scss";

const FileSelectedItemList = ({ picked, setPicked }) => {
  const onHandleCheck = (mapData) => {
    setPicked((pre) => {
      return pre.map((file) => {
        if (file.intern_quest_id === mapData.intern_quest_id) {
          return { ...mapData, check: !mapData.check };
        } else {
          return file;
        }
      });
    });
  };

  return (
    <div className={styles.wrap}>
      <Scrollbar noDefaultStyles disableTracksWidthCompensation>
        <div className={styles.container}>
          {picked?.map((mapData, idx) => (
            <div
              className={styles.item}
              key={`file_list_down_${idx}`}
              onClick={() => onHandleCheck(mapData)}
            >
              <div className={styles.type}>{mapData.list_categoty}</div>
              <div className={styles.text}>{mapData.list_name}</div>
              <div
                className={
                  mapData.check ? `${styles.checked}` : `${styles.check}`
                }
              />
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  );
};

export default FileSelectedItemList;
