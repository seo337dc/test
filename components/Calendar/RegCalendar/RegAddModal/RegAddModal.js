import { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import Modal from "../../../Modal/Modal";
import { timeRange } from "../RegCalendar";
import styles from "./RegAddModal.module.scss";

const roomList = ["회의실 A", "회의실 B", "회의실 C", "회의실 D", "회의실 E"];
const purposeList = ["프로젝트 A 미팅", "프로젝트 B 미팅", "프로젝트 C 미팅"];

const RegAddModal = ({ setModalOpen }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isAllday, setAllday] = useState(false);
  const [isCommentOn, setCommentOn] = useState(false);

  return (
    <Modal darkBg center setModalOpen={setModalOpen}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          회의실 예약
          <i className="xi-close-thin" onClick={() => setModalOpen(false)} />
        </div>
        <div className={styles.item}>
          <div className={styles.title}>예약자</div>
          <div className={styles.ctx}>
            <div className={styles.name}>{userInfo.Tester_Name} 사원</div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.title}>회의실 장소</div>
          <div className={styles.ctx}>
            <select
              className={styles.select}
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            >
              <option value=""></option>
              {roomList.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.title}>사용 날짜</div>
          <div className={styles.ctx} style={{ overflow: "unset" }}>
            <div className="regcaladd">
              <img
                src="/img/small_calendar.svg"
                alt="calc"
                className={styles.small_cal}
              />
              <DatePicker
                value={date}
                onChange={setDate}
                calendarIcon={null}
                clearIcon={null}
                format="yyyy.MM.dd"
              />
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.title}>사용 시간</div>
          <div className={styles.ctx}>
            <div className={styles.time_wrap}>
              <select
                className={styles.time_select}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {timeRange.map((d) => (
                  <option>{d}</option>
                ))}
              </select>
              <div className={styles.dot}>-</div>
              <select
                className={styles.time_select}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                {timeRange.map((d) => (
                  <option>{d}</option>
                ))}
              </select>
              <div
                className={`${styles.allday} ${
                  isAllday ? styles.allday_true : ""
                }`}
                onClick={() => setAllday((prev) => !prev)}
              >
                <i className="xi-check" />
              </div>
              종일
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.title}>사용 목적</div>
          <div className={styles.ctx}>
            <select
              className={styles.select}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value=""></option>
              {purposeList.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.comment}>
          {isCommentOn && (
            <>
              <div className={styles.info}>!</div>
              해당 날짜와 시간에는 예약할 수 없습니다.
            </>
          )}
        </div>

        <div className={styles.btn}>저장</div>
      </div>
    </Modal>
  );
};

export default RegAddModal;
