import * as Types from "../actionTypes/timerTypes";

const initialState = {
  startTime: "2021-01-25 10:00",
  afterTime: 0,
  timeLimit: 7200,
  start: () => {},
  stop: () => {},
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.COUNT_DOWN:
      return { ...state, afterTime: state.afterTime - 1 };
    case Types.COUNT_UP:
      return { ...state, afterTime: state.afterTime + 1 };
    case Types.SET_TIME:
      return action.payload;
    default:
      return state;
  }
};

export default timerReducer;
