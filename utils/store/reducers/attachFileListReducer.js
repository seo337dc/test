import * as Types from "../actionTypes/attachFileListTypes";

const initialState = { listData: [], categoryList: [] };

const attachFileListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ATTACH_FILE_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default attachFileListReducer;
