import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { countDown, setTimer, countUp } from "../store/actions/timerActions";

// for hooks const = [time, setTime, startTimer, stopTimer] = useTimer({...options});
// for redux store = [startTimer, stopTimer] = useTimer({...options, redux: true})

const useTimer = (initialProps = {}) => {
  const {
    initailTime = 180,
    mainOps = false,
    timeInterval = 1000,
    debug = false,
    redux = false,
    reverse = false,
  } = initialProps;
  const dispatch = useDispatch();
  const [time, setTime] = useState(initailTime);
  const isStarted = useRef(false);
  const expectedTime = useRef(0);
  const clearSetT = useRef(null);

  const stop = (isReset) => {
    try {
      debug && console.log("[timer] stop");
      clearTimeout(clearSetT.current);
      if (isReset) {
        debug && console.log("[timer] stop and reset");
        setTime(initailTime);
      }
      isStarted.current = false;
    } catch (e) {
      console.error(e);
    }
  };

  const start = () => {
    try {
      if (isStarted.current) {
        return;
      }
      debug && console.log("[timer] start");
      let run;
      expectedTime.current = Date.now();
      setTimeout(
        (run = () => {
          const drift = Date.now() - expectedTime.current;
          if (redux) {
            if (reverse) {
              dispatch(countUp());
            } else {
              dispatch(countDown());
            }
          } else {
            if (reverse) {
              setTime((prev) => (prev < 0 ? 0 : prev + 1));
            } else {
              setTime((prev) => (prev <= 0 ? 0 : prev - 1));
            }
          }
          expectedTime.current += timeInterval;
          clearSetT.current = setTimeout(run, timeInterval - drift);
        })
      );
      isStarted.current = true;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    try {
      if (redux && mainOps) {
        dispatch(setTimer({ ...mainOps, start, stop }));
      }
      debug && console.log("[timer] initialized");
      return () => clearTimeout(clearSetT.current);
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (redux) {
    return [start, stop];
  } else {
    return [time, setTime, start, stop];
  }
};

export default useTimer;
