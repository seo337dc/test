import * as Types from "../actionTypes/docFileType";

const initialState = { listData: [], categoryList: [] };

const attachFileListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_DOC_FILE_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default attachFileListReducer;
