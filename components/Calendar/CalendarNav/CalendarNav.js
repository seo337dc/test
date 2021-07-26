import { useDispatch } from "react-redux";
import { removeScreen } from "../../../utils/store/actions/divisionActions";
import styles from "./CalendarNav.module.scss";

const CalendarNav = ({ idx, selected, setSelected }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrap}>
      <div />
      {/* <div className={styles.container}>
        <div
          className={`${styles.item} ${selected === 1 ? styles.selected : ""}`}
          onClick={() => setSelected(1)}
        >
          일정
        </div>
        <div
          className={`${styles.item} ${selected === 2 ? styles.selected : ""}`}
          onClick={() => setSelected(2)}
        >
          예약
        </div>
      </div> */}
      <i
        className="xi-close-thin"
        onClick={() => dispatch(removeScreen(idx))}
      />
    </div>
  );
};

export default CalendarNav;
