import * as Types from "../actionTypes/calendarTypes";

const initialState = { data: [] };

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_MAIN_CALENDAR:
      return action.payload;
    default:
      return state;
  }
};

const initialRegState = {};

export const regCalendarReducer = (state = initialRegState, action) => {
  switch (action.type) {
    case Types.SET_REG_CALENDAR:
      return action.payload;
    default:
      return state;
  }
};

export default calendarReducer;
