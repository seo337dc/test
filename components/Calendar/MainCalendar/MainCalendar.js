import { useState, useEffect, useRef } from "react";
import ProcessMenu from "../ProcessMenu/ProcessMenu";
import { useDispatch, useSelector } from "react-redux";
import MainCalendarHeader from "./MailCalendarHeader/MainCalendarHeader";
import setMainCalendar from "../../../utils/Calendar/setMainCalendar";
import DetailModal from "./DetailModal/DetailModal";
import ScheduleRegistration from "./ScheduleRegistration/ScheduleRegistration";
import { setMainCalendarData } from "../../../utils/store/actions/calendarAction";
import { modalWidth, modalHeight } from "../../../utils/common/dataConfig";
import styles from "./MainCalendar.module.scss";

const MainCalendar = ({ idx }) => {
  const dispatch = useDispatch();
  const mainCalendarData = useSelector((state) => state.mainCalendar.data);
  const [isRegOpen, setRegOpen] = useState(false);
  const [isDetailShow, setDetailShow] = useState(false);
  const [modalPosition, setModalPosition] = useState(null);
  const addrListAll = useSelector((state) => state.addressList.teamListData);
  const [picked, setPicked] = useState([]);
  const calendar = useRef();
  const time = useSelector((state) => state.time.startTime);

  useEffect(() => {
    if (addrListAll.length > 0) {
      const tmpAry = [];
      addrListAll.forEach((addr) => tmpAry.push(addr.addrListData));
      setPicked(
        tmpAry.flat().map((data) => `${data.u_name} ${data.u_position}`)
      );
    }
  }, [addrListAll]);

  useEffect(() => {
    if (calendar.current && mainCalendarData) {
      const pickedCalendarData = mainCalendarData.filter(
        (d) =>
          d.target
            .split(", ")
            .map((data) => (data.indexOf("응시자") > -1 ? "응시자" : data))
            .filter((t) =>
              picked
                .map((data) => (data.includes("  ") ? "응시자" : data))
                .includes(t)
            ).length != 0
      );

      calendar?.current?.clear();

      calendar?.current?.createSchedules(pickedCalendarData);
    }
  }, [mainCalendarData, calendar.current, picked]);

  useEffect(() => {
    calendar.current = setMainCalendar(`#mainCalendar_${idx}`, {
      setDetailShow,
      setModalPosition,
      modalWidth,
      modalHeight,
      today: time,
    });
    dispatch(setMainCalendarData());

    return () => calendar.current && calendar.current.destroy();
  }, []);

  return (
    <>
      <div className={styles.wrap} style={{ display: isRegOpen ? "none" : "" }}>
        {isDetailShow && (
          <DetailModal
            id={isDetailShow.id}
            clNo={isDetailShow.clNo}
            setModalOpen={setDetailShow}
            modalWidth={modalWidth}
            modalHeight={modalHeight}
            modalPosition={modalPosition}
            setRegOpen={setRegOpen}
          />
        )}
        <MainCalendarHeader
          calendar={calendar.current}
          setRegOpen={setRegOpen}
        />
        <div id={`mainCalendar_${idx}`} className={styles.container} />
      </div>
      <ProcessMenu
        addrList={addrListAll.filter((team) => team.team_type === "IN")}
        picked={picked}
        setPicked={setPicked}
        style={{ display: isRegOpen ? "none" : "" }}
      />
      {isRegOpen && (
        <ScheduleRegistration isRegOpen={isRegOpen} setRegOpen={setRegOpen} />
      )}
    </>
  );
};

export default MainCalendar;
