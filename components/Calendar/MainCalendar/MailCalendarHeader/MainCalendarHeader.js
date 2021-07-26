import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import styles from "./MainCalendarHeader.module.scss";

const dateFormat = "YYYY.MM";

const MainCalendarHeader = ({ calendar, setRegOpen }) => {
  const [date, setDate] = useState(moment().format(dateFormat));
  const startTime = useSelector((state) => state.time.startTime);

  const onClick = (str) => {
    if (!calendar) {
      return;
    }

    if (str === "prev") {
      calendar.prev();
    } else if (str === "next") {
      calendar.next();
    } else if (str === "today") {
      calendar.setDate(startTime);
    }

    setDate(moment(calendar.getDate()._date).format(dateFormat));
  };

  useEffect(() => {
    if (calendar) {
      setDate(moment(calendar.getDate()._date).format(dateFormat));
    }
  }, [calendar]);

  return (
    <div className={styles.wrap}>
      <div />
      <div className={styles.col}>
        <div className={styles.container}>
          <i className="xi-angle-left-thin" onClick={() => onClick("prev")} />
          {date}
          <i className="xi-angle-right-thin" onClick={() => onClick("next")} />
        </div>
        <div className={styles.today} onClick={() => onClick("today")}>
          TODAY로 이동
        </div>
      </div>
      <div className={styles.regBtn} onClick={() => setRegOpen(true)}>
        일정 등록
      </div>
    </div>
  );
};

export default MainCalendarHeader;
