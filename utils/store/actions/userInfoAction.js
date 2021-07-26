import * as Types from "../actionTypes/userInfoTypes";

export const setUserInfo = (payload) => ({
  type: Types.SET_USER_INFO,
  payload,
});
