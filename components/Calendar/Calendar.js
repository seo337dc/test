import { useState } from "react";
import CalendarNav from "./CalendarNav/CalendarNav";
import MainCalendar from "./MainCalendar/MainCalendar";
import RegCalendar from "./RegCalendar/RegCalendar";
import styles from "./Calendar.module.scss";

const Calendar = ({ idx }) => {
  const [selected, setSelected] = useState(1);

  return (
    <div className={styles.wrap}>
      <CalendarNav idx={idx} selected={selected} setSelected={setSelected} />
      <div className={styles.container}>
        {selected === 1 ? (
          <MainCalendar idx={idx} />
        ) : (
          <RegCalendar idx={idx} />
        )}
      </div>
    </div>
  );
};

export default Calendar;
