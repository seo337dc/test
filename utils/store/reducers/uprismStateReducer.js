import * as Types from "../actionTypes/uprismStateTypes";
//state
//  BEFORE_INIT
//      LOADING
//          SUCCESS

const initialState = {
  state: "BEFORE_INIT",
  External_Code: "",
  Room_ID: "",
  idCard: "",
};

const uprismStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_UPRISM_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initialChatState = { isOpen: false, list: [] };

export const chat = (state = initialChatState, action) => {
  switch (action.type) {
    case Types.SET_CHAT:
      return { ...state, list: [...state.list, action.payload] };
    case Types.SET_CHAT_OPEN:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};

export default uprismStateReducer;
