import * as Types from "../actionTypes/userStateTypes";

// testState ->
// LOGIN
//    DEVICE_CHECK,
//        SIGIN_INFO,
//                READY,
//                    DOING,
//                      FINISH

// STOP

const initialState = {
  check: process.env.NODE_ENV === "production" ? false : true,
  testState: "LOGIN",
  isWaitingToLeave: false,
};

const userStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CHECK:
      return { ...state, check: action.payload };
    case Types.SET_TEST_STATE:
      return { ...state, testState: action.payload };
    case Types.SET_IS_WAITING_TO_LEAVE:
      return { ...state, isWaitingToLeave: action.payload };
    default:
      return state;
  }
};

export default userStateReducer;
