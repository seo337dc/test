import * as Types from "../actionTypes/uprismStateTypes";

export const setUprismState = (payload) => ({
  type: Types.SET_UPRISM_STATE,
  payload,
});

export const setUprismInit = (External_Code, Room_ID) => ({
  type: Types.SET_UPRISM_STATE,
  payload: {
    state: "INIT",
    External_Code,
    Room_ID,
  },
});

export const setUprismSuccess = () => ({
  type: Types.SET_UPRISM_STATE,
  payload: { state: "SUCCESS" },
});

export const setIdCard = (payload) => ({
  type: Types.SET_UPRISM_STATE,
  payload: { idCard: payload },
});

export const setUprismFail = () => ({
  type: Types.SET_UPRISM_STATE,
  payload: { state: "FAIL" },
});

export const setChat = (payload) => ({
  type: Types.SET_CHAT,
  payload,
});

export const setChatOpen = (payload) => ({
  type: Types.SET_CHAT_OPEN,
  payload,
});
