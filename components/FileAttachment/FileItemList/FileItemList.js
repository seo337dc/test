import Scrollbar from "react-scrollbars-custom";
import styles from "./FileItemList.module.scss";

const ItemList = ({ data, pickedIn, inPicked }) => {
  return (
    <div className={styles.outer}>
      <Scrollbar noDefaultStyles disableTracksWidthCompensation>
        <div className={styles.wrap}>
          {data?.map((mapData, idx) => (
            <div
              className={styles.item}
              onClick={() => pickedIn(mapData)}
              key={`file_list_up${idx}`}
            >
              {/* <div className={styles.type}>{mapData.list_kind}</div> */}
              <div className={styles.type}>{mapData.list_categoty}</div>
              <div className={styles.title}>{mapData.list_name}</div>
              <div
                className={`${styles.check} ${
                  inPicked
                    .map((d) => d.intern_quest_id)
                    .includes(mapData.intern_quest_id)
                    ? styles.checked
                    : ""
                }`}
                onClick={() => {}}
              />
              {/* {inPicked
                  .map((d) => d.intern_quest_id)
                  .indexOf(mapData.intern_quest_id) + 1}
              </div> */}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  );
};

export default ItemList;
