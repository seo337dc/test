import * as Types from "../actionTypes/calendarTypes";
import axios from "axios";
import { MAIN_CALENDAR_DATA } from "../../fetch/apiConfig";

export const setMainCalendarData = () => async (dispatch) => {
  try {
    const res = await axios.post(MAIN_CALENDAR_DATA);
    return dispatch({ type: Types.SET_MAIN_CALENDAR, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const setRegCalendarData = () => async (dispatch) => {
  try {
    const res = axios.post();
    return dispatch({ type: Types.SET_REG_CALENDAR });
  } catch (error) {
    console.error(error);
  }
};
