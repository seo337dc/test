import { useEffect } from "react";
import moment from "moment-timezone";
import useTimer from "./useTimer";

const getRmainTime = (startTime, now) => {
  //남은 시간 계산c

  let remainTime;

  if (now) {
    remainTime = ((moment(startTime).valueOf() - now) / 1000).toFixed();
  } else {
    remainTime = (
      (moment(startTime).valueOf() -
        moment(
          moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
        ).valueOf()) /
      1000
    ).toFixed();
  }

  return remainTime <= 0 ? 0 : remainTime;
};

const useSubTimer = (startTime, now) => {
  const [time, setTime, start, stop] = useTimer({
    initailTime: getRmainTime(startTime, now),
  });

  useEffect(() => {
    start();
  }, []);

  return time;
};

export default useSubTimer;
