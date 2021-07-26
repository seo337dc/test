import * as Types from "../actionTypes/timerTypes";

export const countDown = () => ({ type: Types.COUNT_DOWN });

export const setTimer = (payload) => ({ type: Types.SET_TIME, payload });

export const countUp = () => ({ type: Types.COUNT_UP });

// export const startTimer = () => ({ type: Types.START_TIMER });

// export const stopTimer = () => ({ type: Types.STOP_TIMER });
