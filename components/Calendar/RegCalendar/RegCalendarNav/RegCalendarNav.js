import { useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import moment from "moment";
import styles from "./RegCalendarNav.module.scss";

const RegCalendarNav = ({
  category,
  setCategory,
  date,
  setDate,
  dateFormat,
  startTime,
}) => {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.category_wrap}>
        <div
          className={`${styles.btn} ${category == 1 ? styles.selected : ""}`}
          onClick={() => setCategory(1)}
        >
          회의실
        </div>
        <div
          className={`${styles.btn} ${category == 2 ? styles.selected : ""}`}
          onClick={() => setCategory(2)}
        >
          업무 차량
        </div>
        <div
          className={`${styles.btn} ${category == 3 ? styles.selected : ""}`}
          onClick={() => setCategory(3)}
        >
          장비 대여
        </div>
      </div>
      <div className={styles.col_wrap}>
        <div className={styles.col}>
          <div className={styles.container}>
            <i
              className="xi-angle-left-thin"
              onClick={() =>
                setDate(moment(date).add(-1, "days").format(dateFormat))
              }
            />
            {date}
            <i
              className="xi-angle-right-thin"
              onClick={() =>
                setDate(moment(date).add(1, "days").format(dateFormat))
              }
            />
          </div>
          <div
            className={styles.today}
            onClick={() => setDate(moment(startTime).format(dateFormat))}
          >
            TODAY로 이동
          </div>
        </div>
        <img
          src="/img/calendar.svg"
          alt="calendar"
          onClick={() => setDatePickerOpen((prev) => !prev)}
        />
        <div className="regcal">
          <DatePicker
            isOpen={isDatePickerOpen}
            calendarIcon={null}
            clearIcon={null}
            onChange={(d) => setDate(moment(d).format(dateFormat))}
          />
        </div>
      </div>
      <div className={styles.ctx}>
        <div className={styles.info}>
          <div className={`${styles.box} ${styles.w}`} />
          예약가능
          <div className={`${styles.box} ${styles.g}`} />
          예약불가
          <div className={`${styles.box} ${styles.r}`} />내 예약
        </div>
        <div className={styles.text}>
          *예약 가능한 구역을 클릭하여 예약 등록을 해주세요.
        </div>
      </div>
    </div>
  );
};

export default RegCalendarNav;
