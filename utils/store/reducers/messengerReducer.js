import * as Types from "../actionTypes/messengerTypes";

const initialState = { sData: [] };

const messengerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ROOM_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default messengerReducer;
