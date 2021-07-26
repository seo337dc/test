import { combineReducers } from "redux";
import time from "./reducers/timerReducer";
import userInfo from "./reducers/userInfoReducer";
import userState from "./reducers/userStateReducer";
import modalState from "./reducers/modalStateReducer";
import division from "./reducers/divisionReducer";
import todo from "./reducers/todoReducer";
import timeTable from "./reducers/timeTableReducer";
import {
  mailListReducer,
  mailToListReducer,
  mailTempListReducer,
  addressListReducer,
} from "./reducers/mailReducer";
import mainCalendar, { regCalendarReducer } from "./reducers/calendarReducer";
import memoList from "./reducers/memoReducer";
import messenger from "./reducers/messengerReducer";
import attachFile from "./reducers/attachFileListReducer";
import alertMessage from "./reducers/alertMessageReducer";
import uprismState, { chat } from "./reducers/uprismStateReducer";

const reducers = combineReducers({
  time,
  userInfo,
  userState,
  modalState,
  division,
  timeTable,
  todo,
  mailList: mailListReducer,
  mailToList: mailToListReducer,
  mailTempList: mailTempListReducer,
  addressList: addressListReducer,
  mainCalendar,
  regCalendar: regCalendarReducer,
  memoList,
  messenger,
  attachFile,
  alertMessage,
  uprismState,
  chat,
});

export default reducers;
