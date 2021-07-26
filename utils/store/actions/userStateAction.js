import * as Types from "../actionTypes/userStateTypes";
import axios from "axios";
import { END_TEST, END_PREV_TEST } from "../../fetch/apiConfig";

export const setCheck = (payload) => (dispatch, getState) => {
  const userInfo = getState().userInfo;
  if (userInfo.isPreCheck) {
    dispatch({
      type: Types.SET_CHECK,
      payload: true,
    });
  } else {
    dispatch({
      type: Types.SET_CHECK,
      payload,
    });
  }
};

export const setTestStateDeviceCheck = () => ({
  type: Types.SET_TEST_STATE,
  payload: "DEVICE_CHECK",
});

export const setTestStateSiginInfo = () => ({
  type: Types.SET_TEST_STATE,
  payload: "SIGNFO",
});

export const setTestStateReady = () => ({
  type: Types.SET_TEST_STATE,
  payload: "READY",
});

export const setTestStateDoing = () => ({
  type: Types.SET_TEST_STATE,
  payload: "DOING",
});

export const setTestStateFinish = () => async (dispatch, getState) => {
  const userInfo = getState().userInfo;
  const stopTimer = getState().time.stop;
  stopTimer && stopTimer();

  try {
    if (userInfo.isPreCheck) {
      await axios.post(END_PREV_TEST);
    } else {
      await axios.post(END_TEST);
    }
  } catch (error) {
    console.error(error);
    return dispatch({
      type: Types.SET_TEST_STATE,
      payload: "FINISH",
    });
  }

  return dispatch({
    type: Types.SET_TEST_STATE,
    payload: "FINISH",
  });
};

export const setIsWaitingToLeave = (payload) => ({
  type: Types.SET_IS_WAITING_TO_LEAVE,
  payload,
});
