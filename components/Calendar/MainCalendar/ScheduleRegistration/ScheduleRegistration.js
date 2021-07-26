import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import moment from "moment";
import axios from "axios";
import {
  SCHEDULE_SAVE,
  SCHEDULE_EDIT,
  CALENDAR_SELECT_TITLE,
  CALENDAR_SELECT_PLACE,
  MODAL_CALENDAR,
} from "../../../../utils/fetch/apiConfig";
import { setMainCalendarData } from "../../../../utils/store/actions/calendarAction";
import { hrRange, minRange } from "../../../../utils/common/dataConfig";
// import AddressBook from "../../../Mail/MailWrite/AddressBook/AddressBook";
import CalendarAddressBook from "../../CalendarAddressBook/CalendarAddressBook";
import styles from "./ScheduleRegistration.module.scss";

const joinString = ", ";

const ScheduleRegistration = ({ isRegOpen, setRegOpen }) => {
  const dispatch = useDispatch();
  const startTime = useSelector((state) => state.time.startTime);

  const [isAddrBookOpen, setAddrBookOpen] = useState(false);
  const [titleList, setTitleList] = useState([]);
  const [title, setTitle] = useState("-1");
  const [startDate, setStartDate] = useState(() =>
    startTime ? new Date(startTime) : new Date()
  );
  const [endDate, setEndDate] = useState(() =>
    startTime ? new Date(startTime) : new Date()
  );
  const [isAllday, setAllday] = useState(false);
  const [startHr, setStartHr] = useState("09");
  const [startMin, setStartMin] = useState("00");
  const [endHr, setEndHr] = useState("09");
  const [endMin, setEndMin] = useState("00");
  const [placeList, setPlaceList] = useState([]);
  const [place, setPlace] = useState("");
  const [att, setAtt] = useState([]);
  const [text, setText] = useState("");
  const [cmt, setCmt] = useState("");
  const isLoading = useRef(false);

  const isEdit = isRegOpen && isRegOpen !== true;

  const save = async () => {
    if (isLoading.current) {
      return;
    }
    if (title == -1 || place === "" || att.length == 0) {
      return setCmt("입력되지 않은 곳이 있습니다.");
    }

    try {
      if (
        moment(startDate).set({ hour: startHr, minute: startMin }) >=
        moment(endDate).set({ hour: endHr, minute: endMin })
      ) {
        return setCmt("시간이 올바르지 않습니다.");
      }
      isLoading.current = true;
      let attendeesList = [6, 30, 54, 78, 102, 126, 150];

      await axios.post(isEdit ? SCHEDULE_EDIT : SCHEDULE_SAVE, {
        seq: isEdit ? isRegOpen : null,
        internQuestId: titleList[title].Intern_Quest_ID,
        title: titleList[title].Title,
        description: text,
        attendees: att
          .map((data) => {
            if (attendeesList.includes(data.addr_no)) {
              return `응시자 사원`;
            } else {
              return `${data.u_name} ${data.u_position}`;
            }
          })
          .join(joinString),
        place: place,
        startYear: moment(startDate).format("yyyy"),
        startMonth: moment(startDate).format("MM"),
        startDay: moment(startDate).format("DD"),
        endYear: moment(endDate).format("yyyy"),
        endMonth: moment(endDate).format("MM"),
        endDay: moment(endDate).format("DD"),
        startHour: startHr,
        startMin: startMin,
        endHour: endHr,
        endMin: endMin,
        allDay: isAllday ? "Y" : "N",
      });
      dispatch(setMainCalendarData());
      isLoading.current = false;
      setRegOpen(false);
    } catch (error) {
      isLoading.current = false;
      if (error.response) {
        setCmt(error.response.data.msg);
      }

      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        isLoading.current = true;
        const tl = await axios.post(CALENDAR_SELECT_TITLE);
        setTitleList(tl.data.data);
        const pl = await axios.post(CALENDAR_SELECT_PLACE);
        setPlaceList(pl.data.data);
        isLoading.current = false;

        if (isEdit) {
          isLoading.current = true;
          const res = await axios.post(MODAL_CALENDAR, {
            seq: isRegOpen,
          });
          const mData = res.data.data[0];

          setTitle(() => {
            let idx = -1;
            for (let i = 0; i < tl.data.data.length; i++) {
              if (tl.data.data[i].Title == mData.title) {
                idx = i;
              }
            }
            return idx;
          });
          setStartDate(
            () =>
              new Date(
                `${mData.startYear}-${mData.startMonth}-${mData.startDay}`
              )
          );
          setEndDate(
            () => new Date(`${mData.endYear}-${mData.endMonth}-${mData.endDay}`)
          );
          setAllday(mData.isAllDay);
          setStartHr(mData.startHour);
          setStartMin(mData.startMin);
          setEndHr(mData.endHour);
          setEndMin(mData.endMin);
          setPlace(mData.place);
          setAtt(
            mData.target.map((data) => {
              if (data.u_name === "응시자") {
                return { ...data, u_name: mData.writer.replace("사원", "") };
              } else {
                return data;
              }
            }) || []
          );
          setText(mData.desc);
          isLoading.current = false;
        }
      } catch (error) {
        console.error(error);
        isLoading.current = false;
      }
    })();
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.title}>일정 등록</div>
        <div className={styles.reg_wrap}>
          <div className={styles.item_wrap}>
            <div className={styles.item_title}>제목</div>
            <div className={styles.item_container}>
              <select
                className={styles.select}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setCmt("");
                }}
              >
                <option value={-1} disabled={isEdit}></option>
                {titleList?.map((data, idx) => (
                  <option
                    value={idx}
                    key={`calendar_junyeong1_${idx}`}
                    disabled={isEdit}
                  >
                    {data.Title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.item_wrap}>
            <div className={styles.item_title}>일자</div>
            <div className={styles.item_container}>
              <div className={styles.date_wrap}>
                <DatePicker
                  value={startDate}
                  onChange={setStartDate}
                  calendarIcon={null}
                  clearIcon={null}
                  format="y-MM-dd"
                  locale="ko"
                  calendarType="US"
                />
                <div className={styles.d}>-</div>
                <DatePicker
                  value={endDate}
                  onChange={setEndDate}
                  calendarIcon={null}
                  clearIcon={null}
                  format="y-MM-dd"
                  locale="ko"
                  calendarType="US"
                />
              </div>
            </div>
          </div>

          <div className={styles.item_wrap}>
            <div className={styles.item_title}>시간</div>
            <div className={styles.item_container}>
              <div className={styles.time_wrap}>
                <select
                  className={styles.time}
                  value={startHr}
                  onChange={(e) => setStartHr(e.target.value)}
                >
                  {hrRange.map((data, idx) => (
                    <option value={data} key={`calendar_junyeong2_${idx}`}>
                      {data}
                    </option>
                  ))}
                </select>
                <div className={styles.dd}>:</div>
                <select
                  className={styles.time}
                  value={startMin}
                  onChange={(e) => setStartMin(e.target.value)}
                >
                  {minRange.map((data, idx) => (
                    <option value={data} key={`calendar_junyeong3_${idx}`}>
                      {data}
                    </option>
                  ))}
                </select>
                <div className={styles.d}>-</div>
                <select
                  className={styles.time}
                  value={endHr}
                  onChange={(e) => setEndHr(e.target.value)}
                >
                  {hrRange.map((data, idx) => (
                    <option value={data} key={`calendar_junyeong4_${idx}`}>
                      {data}
                    </option>
                  ))}
                </select>
                <div className={styles.dd}>:</div>
                <select
                  className={styles.time}
                  value={endMin}
                  onChange={(e) => setEndMin(e.target.value)}
                >
                  {minRange.map((data, idx) => (
                    <option value={data} key={`calendar_junyeong5_${idx}`}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.item_wrap}>
            <div className={styles.item_title}>장소</div>
            <div className={styles.item_container}>
              <select
                className={styles.select}
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                  setCmt("");
                }}
              >
                <option value=""></option>
                {placeList?.map((data, idx) => (
                  <option
                    value={data.Category_KORNM}
                    key={`calendar_junyeong6_${idx}`}
                  >
                    {data.Category_KORNM}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.item_wrap}>
            <div className={styles.item_title}>
              참석자
              <div
                className={styles.plus}
                onClick={() => setAddrBookOpen(true)}
              >
                <i className="xi-plus" />
              </div>
            </div>
            <div className={styles.item_container}>
              <div
                className={styles.attendees}
                onClick={() => setAddrBookOpen(true)}
              >
                {att
                  .map((data) => `${data.u_name} ${data.u_position}`)
                  .join(joinString)}
              </div>
            </div>
          </div>

          <div className={styles.item_wrap}>
            <div className={styles.item_title}>세부 내용</div>
            <div className={styles.item_container}>
              <textarea
                className={styles.text}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.cmt}>{cmt}</div>
        <div className={styles.btn_wrap}>
          <div className={`${styles.btn} ${styles.gray}`} onClick={save}>
            저장
          </div>
          <div
            className={`${styles.btn} ${styles.light_gray}`}
            onClick={() => setRegOpen(false)}
          >
            취소
          </div>
        </div>
      </div>
      {isAddrBookOpen && (
        <CalendarAddressBook
          setModalOpen={setAddrBookOpen}
          setAddrInfo={setAtt}
          addrInfo={att}
          setCmt={setCmt}
        />
      )}
    </div>
  );
};

export default ScheduleRegistration;
