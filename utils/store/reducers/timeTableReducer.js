import * as Types from "../actionTypes/timeTableTypes";

const initialState = [];

const timeTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_TIME_TABLE:
      return action.payload;
    default:
      return state;
  }
};

export default timeTableReducer;
