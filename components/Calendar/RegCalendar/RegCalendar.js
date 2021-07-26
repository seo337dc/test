import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import RegCalendarNav from "./RegCalendarNav/RegCalendarNav";
import RegDetailModal from "./RegDetailModal/RegDetailModal";
import RegAddModal from "./RegAddModal/RegAddModal";
import { modalPosition } from "../../../utils/Calendar/setMainCalendar";
import styles from "./RegCalendar.module.scss";

const detailModalWidth = 310;
const detailModalHeight = 361;
const dateFormat = "YYYY.MM.DD";
export const timeRange = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];
const blank = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const itemHeightPercent = 9.5;

/**
 * @param {string} start ex)10:00 [0-1][0-9]:00
 * @param {string} end ex)13:00 [0-1][0-9]:00
 */
const getTimeDistance = (start, end) =>
  timeRange.indexOf(end) - timeRange.indexOf(start);

/**
 * @param {boolean} isLast delete right div line
 */
const Item = ({ setDetailModalOpen, setRegAddOpen, isLast }) => {
  const openAddNewReg = (e) => {
    e.stopPropagation();
    setRegAddOpen(true);
  };

  const openDetailModal = (e) => {
    e.stopPropagation();
    setDetailModalOpen(
      modalPosition(e.clientX, e.clientY, detailModalWidth, detailModalHeight)
    );
  };

  return (
    <div className={styles.item}>
      {!isLast && <div className={styles.c} />}
      {timeRange.map((t, i) => (
        <div
          className={styles.l}
          style={{ top: `${(i + 1) * itemHeightPercent}%` }}
        />
      ))}

      {blank.map((t) => (
        <div
          className={styles.tb}
          style={{
            height: `${1 * itemHeightPercent}%`,
            top: `${(t + 1) * itemHeightPercent}%`,
          }}
        >
          <div className={styles.blank} onClick={openAddNewReg} />
        </div>
      ))}

      <div
        className={styles.tb}
        style={{
          height: `${getTimeDistance("10:00", "11:00") * itemHeightPercent}%`,
          top: `${(timeRange.indexOf("10:00") + 1) * itemHeightPercent}%`,
        }}
      >
        <div className={`${styles.tbi}`} onClick={openDetailModal}>
          10:00 - 11:00
          <br />
          테스트 사원
        </div>
      </div>

      <div
        className={styles.tb}
        style={{
          height: `${getTimeDistance("14:00", "18:00") * itemHeightPercent}%`,
          top: `${(timeRange.indexOf("14:00") + 1) * itemHeightPercent}%`,
        }}
      >
        <div
          className={`${styles.tbi} ${styles.mine}`}
          onClick={openDetailModal}
        >
          14:00 - 18:00
          <br />
          테스트 사원
        </div>
      </div>

      <div className={styles.title}>테스트</div>
    </div>
  );
};

/**
 * @param {number} idx calendar id
 */
const RegCalendar = ({ idx }) => {
  const startTime = useSelector((state) => state.time.startTime);
  const [date, setDate] = useState(moment(startTime).format(dateFormat));
  const [category, setCategory] = useState(1);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isRegAddModalOpen, setRegAddOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className={styles.wrap}>
      <RegCalendarNav
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
        dateFormat={dateFormat}
        startTime={startTime}
      />
      <div className={styles.container}>
        <div className={styles.time}>
          {timeRange.map((t, i) => (
            <div className={styles.t} style={{ top: `${(i + 1) * 9.5}%` }}>
              {t}
            </div>
          ))}
        </div>
        <div className={styles.item_wrap}>
          <Item
            setDetailModalOpen={setDetailModalOpen}
            setRegAddOpen={setRegAddOpen}
          />
        </div>
      </div>
      {isDetailModalOpen && (
        <RegDetailModal
          width={detailModalWidth}
          height={detailModalHeight}
          id={isDetailModalOpen.id}
          top={isDetailModalOpen.top}
          left={isDetailModalOpen.left}
          setModalOpen={setDetailModalOpen}
          isMine
        />
      )}
      {isRegAddModalOpen && <RegAddModal setModalOpen={setRegAddOpen} />}
    </div>
  );
};

export default RegCalendar;
