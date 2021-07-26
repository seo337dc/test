import * as Types from "../actionTypes/userInfoTypes";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_USER_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
