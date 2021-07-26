import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pushAlertMessage } from "../../utils/store/actions/alertMessageAction";
import { setTestStateFinish } from "../../utils/store/actions/userStateAction";
import axios from "axios";
import { SAVETIME } from "../../utils/fetch/apiConfig";
import moment from "moment";
import { getItemDirectly } from "../../utils/common/nextAction";
import { useDebounce } from "light-hooks";
import styles from "./Timer.module.scss";

const timeSaveSecInterval = parseInt(Math.random() * (14 - 11) + 11);

const Timer = () => {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.time);
  const timeTableData = useSelector((state) => state.timeTable);
  const debounced = useDebounce((i) => dispatch(pushAlertMessage(i)), 3000, {
    leading: true,
    trailing: false,
  });
  const isTurnRed = time.timeLimit - time.afterTime <= 300;

  const nextItem = () => {
    //다음 실행 아이템 가져옴
    const result = timeTableData.filter(
      (data) => data.After_LoginTime_Sec == time.afterTime
    );
    return result;
  };

  const excuteTimeTable = async () => {
    //실행 시간이 된 아이템 실행
    try {
      if (nextItem().length > 0) {
        for (let i = 0; i < nextItem().length; i++) {
          await getItemDirectly(
            nextItem()[i].Intern_Quest_ID,
            dispatch,
            debounced
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTime = async () => {
    //시간 저장
    try {
      await axios.post(SAVETIME, {
        afterTime: time.afterTime,
      });
      console.log("[timer] 시간 저장");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (time.afterTime !== 0 && time.afterTime % timeSaveSecInterval === 0) {
      //주기적 시간 저장
      saveTime();
    }
    if (time.afterTime !== 0 && time.timeLimit - time.afterTime === 5400) {
      // 90분 전
      dispatch(pushAlertMessage("90M"));
    }
    if (time.afterTime !== 0 && time.timeLimit - time.afterTime === 3600) {
      // 60분 전
      dispatch(pushAlertMessage("60M"));
    }
    if (time.afterTime !== 0 && time.timeLimit - time.afterTime === 1800) {
      // 30분 전
      dispatch(pushAlertMessage("30M"));
    }
    if (time.afterTime !== 0 && time.timeLimit - time.afterTime === 300) {
      // 5분 전
      dispatch(pushAlertMessage("5M"));
    }
    if (time.afterTime !== 0 && time.timeLimit - time.afterTime === 60) {
      // 1분 전
      dispatch(pushAlertMessage("1M"));
    }

    if (time.afterTime && time.timeLimit <= time.afterTime) {
      //제한시간 도달
      dispatch(setTestStateFinish());
    }

    //타임 테이블 실행
    excuteTimeTable();
  }, [time.afterTime, timeTableData]);

  return (
    <div className={styles.timer}>
      <div className={styles.date}>
        {moment(time.startTime).add(time.afterTime, "s").format("YYYY-MM-DD")}
      </div>
      <div
        className={styles.time}
        style={{ color: isTurnRed ? "#DA291C" : "" }}
      >
        {moment(time.startTime).add(time.afterTime, "s").format("HH:mm:ss")}
      </div>
    </div>
  );
};

export default Timer;
